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
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/google/go-github/v48/github"
)

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
func main() {
	var owner = ""
	print("Please enter a github username you would like to query, or type \"quit\" to quit: ")
	fmt.Scan(&owner)
	for owner != "quit" {
		ctx := context.Background()
		client := github.NewClient(nil)
		input_repo := ""
		print("Please enter a repo associated with that github username: ")
		fmt.Scan(&input_repo)
		commit_activity, _, err := client.Repositories.ListCommitActivity(ctx, owner, input_repo)
		if err != nil {
			println("Error: ", err.Error())
		}
		languages, _, err := client.Repositories.ListLanguages(ctx, owner, input_repo)
		if err != nil {
			println("Error: ", err.Error())
		}
		var commit_avg int = 0
		for _, week := range commit_activity {
			commit_avg += *week.Total
		}
		commit_avg /= len(commit_activity)
		println("Languages: ", fmt.Sprint(languages), "\n",
			"Average weekly commits over past year: ", commit_avg)
		print("Please enter a github username you would like to query, or type \"quit\" to quit: ")
		fmt.Scan(&owner)
	}
}
