package main

import (
	"context"
	"fmt"
	"regexp"
	"testing"

	"github.com/google/go-github/v48/github"
	"golang.org/x/oauth2"
)

const owner = "alexandersep"
const input_repo = "CSU33012-SWENG-ASS1"

var token string = "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"

/*
func TestGetApiData(t *testing.T) {

}

func testIsBlocking(t *testing.T) {

}

	func Test_weekly_commits(t *testing.T) {
		var repo *github.Repository
		var commit_activity []*github.WeeklyCommitActivity
		ctx := context.Background()
		var client *github.Client = github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})))
		want := regexp.MustCompile("7.795173")
		repo, _, err := client.Repositories.Get(ctx, owner, input_repo)
		commit_activity, _, err = client.Repositories.ListCommitActivity(ctx, owner, input_repo)
		ans, err := weekly_commits(repo.CreatedAt.Time, commit_activity)
		if !want.MatchString(fmt.Sprintf("%f", ans)) || err != nil {
			t.Fatalf(`weekly commits = %f, %v, want match for %#q, nil`, ans, err, want)
		}
	}

func test_commits_ratio(t *testing.T) {

}
*/
func Test_commits_per_contrib(t *testing.T) {
	var contributors []*github.Contributor
	ctx := context.Background()
	var client *github.Client = github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})))
	var want = map[string]int{"alexandersep": 61, "ni-sauvage": 18}
	contributors, err := get_all_contributors(client, ctx, owner, input_repo)
	ans, err := commits_per_contrib(contributors)
	y := regexp.MustCompile(fmt.Sprint(ans))
	if y.MatchString(fmt.Sprint(want)) || err != nil {
		t.Fatalf(`commits p contrib = %q, %v, want match for %#q, nil`, fmt.Sprint(ans), err, fmt.Sprint(want))
	}
}

/*
	func test_get_all_issues(t *testing.T) {
		ctx := context.Background()
		var client *github.Client = github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})))
		var want []*github.Issue
	}

func test_get_all_contributors(t *testing.T) {

}
*/
func Test_mean_issue_time(t *testing.T) {
	ctx := context.Background()
	var client *github.Client = github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{AccessToken: token})))
	want := regexp.MustCompile("3.145783")
	issues, err := get_all_issues(client, ctx, owner, input_repo)
	ans, err := mean_issue_time(issues)
	if !want.MatchString(fmt.Sprintf("%f", ans)) || err != nil {
		t.Fatalf(`issue lifetime = %f, %v, want match for %#q, nil`, ans, err, want)
	}
}
