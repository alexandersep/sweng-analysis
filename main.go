/* EXAMPLES

We can search for all repos belonging to a user like so:

	repos, _, err := client.Repositories.List(ctx, owner, nil)
	if err != nil {
		println("Error: ", err)
		return
	}

We can search for a certain repo using github's search engine and a keyword:

	repo, _, err := client.Search.Repositories(ctx, "owner/repo", nil)
	if err != nil {
		println("Error: ", err)
		return
	}

	If we want raw JSON data from the API, we can then do something like
	data, _ := getApiData(*repo.Repositories[0].LanguagesURL) - We're assuming here that the first result *is* the correct repo though

*/

package main

import (
	"context"
	"os"
	"syscall"

	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/go-github/v48/github"
	"golang.org/x/crypto/ssh/terminal"
	"golang.org/x/oauth2"
)

const SECONDS_IN_WEEK int = 604800
const WEEKS_IN_YEAR int = 52
const SECONDS_IN_DAY int = 86400

type metrics struct {
	Owner          string         `json:"owner"`
	Repo           string         `json:"repo"`
	Languages      map[string]int `json:"languages"`
	Commit_Average float64        `json:"average_commits_this_year"`
}

var user_metrics = metrics{}

func getMetrics(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "*")
	context.IndentedJSON(http.StatusOK, user_metrics)
}

func populate_metrics(owner, repo string, languages map[string]int, commit_avg float64) {
	user_metrics = metrics{
		Owner: owner, Repo: repo, Languages: languages, Commit_Average: commit_avg,
	}
}

func init_server() {
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/metrics", getMetrics)
	router.Run("localhost:9090")
}

func getApiData(url string) ([]byte, error) {
	response, err := http.Get(url)

	if err != nil {
		return nil, err
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	return responseData, nil
}

func isBlocking(err error) bool {
	if err == nil || err.Error() != "job scheduled on GitHub side; try again later" {
		return false
	}
	return true
}

func weekly_commits(created_at time.Time, commit_activity []*github.WeeklyCommitActivity) (float64, error) {
	if commit_activity == nil {
		return 0, fmt.Errorf("commit activity was nil")
	}
	repo_weeks := time.Since(created_at).Seconds() / float64(SECONDS_IN_WEEK)
	if int(repo_weeks) > WEEKS_IN_YEAR {
		repo_weeks = float64(WEEKS_IN_YEAR)
	}
	var commit_avg float64 = 0.0
	for _, week := range commit_activity {
		commit_avg += float64(*week.Total)
	}

	commit_avg /= repo_weeks
	return commit_avg, nil
}

func commits_ratio(contributors []*github.Contributor) (map[string]float64, error) {
	if contributors == nil {
		return nil, fmt.Errorf("commit activity was nil")
	}
	var ratio_map map[string]float64 = make(map[string]float64)
	var max_commits int = 0
	for _, contrib := range contributors {
		if *contrib.Contributions > max_commits {
			max_commits = *contrib.Contributions
		}
	}
	for _, contrib := range contributors {
		if contrib != nil {
			ratio_map[*contrib.Login] = float64(*contrib.Contributions) / float64(max_commits)
		}
	}
	return ratio_map, nil
}

func commits_per_contrib(contributors []*github.Contributor) (map[string]int, error) {
	if contributors == nil {
		return nil, fmt.Errorf("commit activity was nil")
	}
	var contib_activity map[string]int = make(map[string]int)
	for _, contrib := range contributors {
		if contrib != nil {
			contib_activity[*contrib.Login] = *contrib.Contributions
		}
	}
	return contib_activity, nil
}

func get_all_issues(client *github.Client, ctx context.Context, owner string, repo string) ([]*github.Issue, error) {
	options := new(github.ListOptions)
	options.PerPage = 100
	issue_options := new(github.IssueListByRepoOptions)
	issue_options.ListOptions = *options
	issue_options.ListOptions.Page = 1
	issue_options.State = "closed"
	var issue_array []*github.Issue = make([]*github.Issue, 0)
	issues_parsed := false
	for !issues_parsed {
		issues, _, err := client.Issues.ListByRepo(ctx, owner, repo, issue_options)
		if err != nil {
			return nil, err
		}
		if len(issues) == 0 {
			issues_parsed = true
		}
		for _, issue := range issues {
			if issue.ClosedAt != nil && issue.PullRequestLinks == nil {
				issue_array = append(issue_array, issue)
			}
		}
		issue_options.ListOptions.Page++
	}
	return issue_array, nil
}

func get_all_contributors(client *github.Client, ctx context.Context, owner string, repo string) ([]*github.Contributor, error) {
	options := new(github.ListOptions)
	options.PerPage = 100
	contrib_options := new(github.ListContributorsOptions)
	contrib_options.ListOptions = *options
	contrib_options.ListOptions.Page = 1
	var contributors []*github.Contributor = make([]*github.Contributor, 0)
	traversing := true
	for traversing {
		contrib_page, _, err := client.Repositories.ListContributors(ctx, owner, repo, contrib_options)
		if err != nil {
			return nil, err
		}
		if len(contrib_page) == 0 {
			traversing = false
		} else {
			contributors = append(contributors, contrib_page...)
		}
		contrib_options.ListOptions.Page++
	}
	return contributors, nil
}

func mean_issue_time(issues []*github.Issue) (float64, error) {
	var mean_time_issue uint64 = 0
	if issues == nil {
		return 0, fmt.Errorf("issues are nil")
	}
	for _, issue := range issues {
		mean_time_issue += uint64(issue.ClosedAt.Unix() - issue.CreatedAt.Unix())
	}
	return (float64(mean_time_issue) / float64(len(issues))) / float64(SECONDS_IN_DAY), nil
}

func main() {
	owner := "alexandersep"
	input_repo := "CSU33012-SWENG-ASS1"

	args := os.Args[1:]

	// ==AUTHORISATION==
	// If the var 'token' is still an empty string (I.E. not hard-coded to a value),
	// we ask the terminal for a valid token. Either way, once we have a valid token,
	// we set up 'client' to be a *github.client that's token authorised.

	// Loads token first from command line arguments, if not supplied, from environment variables, and finally from user input if all else fails.
	var token string
	if len(args) < 1 {
		token = os.Getenv("GITTOKEN")
	} else {
		token = args[0]
	}

	// Variables we want to use outside of the loop.
	ctx := context.Background()
	var client *github.Client

	// The only way to break out of the loop is with a valid token.
	for {

		// If we haven't hard-coded 'token', get the token string from the user.
		if token == "" {
			print("Please paste in your github token (https://github.com/settings/tokens):\n >")
			token_bytes, _ := terminal.ReadPassword(int(syscall.Stdin))
			println()
			token = string(token_bytes)
		}

		// Authorise the token
		token_source := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})
		token_client := oauth2.NewClient(ctx, token_source)
		client = github.NewClient(token_client)

		// If the token is invalid, or if any errors occur, run the loop again.
		_, _, err := client.Users.Get(ctx, "")
		if err != nil {
			if err.Error() == "GET https://api.github.com/user: 401 Bad credentials []" {
				println("\n401: Bad credentials. Please try again.")
			}
			token = ""
			continue
		}

		// Otherwise, continue on with the program. The var client is now authorised, and
		// should have more api calls, and an increased rate of 5,000 requests p/hour.
		break
	}
	// ==END AUTHORISATION==

	var commit_activity []*github.WeeklyCommitActivity
	var err error = &github.AcceptedError{}
	var languages map[string]int
	blocking := true
	var repo *github.Repository
	var contributors []*github.Contributor
	var issue_time float64
	var current_week_activity *github.WeeklyCommitActivity
	for blocking {

		commit_activity, _, err = client.Repositories.ListCommitActivity(ctx, owner, input_repo)
		if err != nil && !isBlocking(err) {
			println("Error: ", err.Error())
		}
		blocking = isBlocking(err)

		languages, _, err = client.Repositories.ListLanguages(ctx, owner, input_repo)
		if err != nil && !isBlocking(err) {
			println("Error: ", err.Error())
		}

		blocking = isBlocking(err) || blocking

		repo, _, err = client.Repositories.Get(ctx, owner, input_repo)
		if err != nil && !isBlocking(err) {
			println("Error: ", err.Error())
		}

		blocking = isBlocking(err) || blocking

		contributors, err = get_all_contributors(client, ctx, owner, input_repo)
		if err != nil {
			fmt.Print(err)
		}
		issues, err := get_all_issues(client, ctx, owner, input_repo)
		if err != nil {
			fmt.Print(err)
		}

		issue_time, err = mean_issue_time(issues)
		if err != nil {
			fmt.Print(err)
		}

		current_week_activity = commit_activity[len(commit_activity)-1]
		if blocking {
			time.Sleep(1 * time.Second)
		}
	}

	commit_avg, err := weekly_commits(repo.CreatedAt.Time, commit_activity)
	if err != nil {
		fmt.Printf("ERROR: %v", err)
	}
	commits_map, err := commits_per_contrib(contributors)
	if err != nil {
		fmt.Printf("ERROR: %v", err)
	}
	println("Languages: ", fmt.Sprint(languages), "\n",
		"Average weekly commits over past year: ", commit_avg, "\n",
		"Commits per contributor: ", fmt.Sprint(commits_map), "\n",
		"Average days between issue completion: ", issue_time, "\n",
		"Current week activity is: ", fmt.Sprint(current_week_activity.String()))
	populate_metrics(owner, input_repo, languages, commit_avg)
	init_server()
}
