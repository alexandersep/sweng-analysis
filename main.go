package main

import (
	"context"
	"fmt"

	"github.com/google/go-github/v48/github"
)

func main() {

	var owner = ""
	print("Please enter a github username you would like to query, or type \"quit\" to quit: ")
	fmt.Scan(&owner)
	for owner != "quit" {
		ctx := context.Background()
		client := github.NewClient(nil)
		//repos, _, err := client.Repositories.List(ctx, owner, nil)
		/*if err != nil {
			println("Error: ", err)
			return
		}
		*/
		input_repo := ""
		print("Please enter a repo associated with that github username: ")
		fmt.Scan(&input_repo)

		commit_activity, _, err := client.Repositories.ListCommitActivity(ctx, owner, input_repo)
		if err != nil {
			println("Error: ", err.Error())
			return
		}
		languages, _, err := client.Repositories.ListLanguages(ctx, owner, input_repo)
		if err != nil {
			println("Error: ", err.Error())
			return
		}
		var commit_avg int = 0
		for _, week := range commit_activity {
			commit_avg += *week.Total
		}
		commit_avg /= 52
		println("Languages: ", fmt.Sprint(languages), "\n",
			"Average weekly commits over past year: ", commit_avg)
		print("Please enter a github username you would like to query, or type \"quit\" to quit: ")
		fmt.Scan(&owner)
	}
}
