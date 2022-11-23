package main

import (
	"context"
	"os"
	"syscall"
	"testing"

	"github.com/google/go-github/v48/github"
	"golang.org/x/crypto/ssh/terminal"
	"golang.org/x/oauth2"
)

var client *github.Client
var ctx context.Context
var contribs []*github.Contributor
var issues []*github.Issue
var err error

func TestAuth(t *testing.T) {
	ctx = context.Background()

	// The only way to break out of the loop is with a valid token.
	token := os.Args[3]
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
		t.Fatalf(`Failed to authenticate: Error: %v`, err)
	}
}

func TestAllIssues(t *testing.T) {
	issues, err = get_all_issues(client, ctx, "alexandersep", "CSU33012-SWENG-ASS1")
	if err != nil {
		t.Fatalf(`Failed to get issue data: Error: %v`, err)
	}
	if len(issues) != 8 {
		t.Fatalf(`Incorrect count of issues: Error: %v`, err)
	}
}

func TestGetContribs(t *testing.T) {
	contribs, err = get_all_contributors(client, ctx, "alexandersep", "CSU33012-SWENG-ASS1")
	if err != nil {
		t.Fatalf(`Failed to get contributor data: Error: %v`, err)
	}
	if len(contribs) != 2 {
		t.Fatalf(`Incorrect count of contributors: Error: %v, amount of contributors: 2 - amount found: %v`, err, len(issues))
	}
	if *contribs[0].Login != "alexandersep" || *contribs[1].Login != "ni-sauvage" {
		t.Fatalf(`Incorrect contributors: Error: %v. Contribs should be alexandersep and ni-sauvage, found %v, %v`, err, contribs[0].Login, contribs[1].Login)
	}
}

func TestCommitsPerContrib(t *testing.T) {
	commits, err := commits_per_contrib(contribs)
	if err != nil {
		t.Fatalf(`Failed to create map: Error: %v`, err)
	}
	if len(commits) != 2 {
		t.Fatalf(`Incorrect count of contributors: Error: %v, amount of contributors: 2 - amount found: %v`, err, len(commits))
	}
	if commits["ni-sauvage"] != 18 || commits["alexandersep"] != 61 {
		t.Fatalf(`Incorrect commit count: Error: %v. Commits should be 61 for alexandersep and 18 for ni-sauvage, found %v, %v`, err, commits["alexandersep"] != 61, commits["ni-sauvage"])
	}
}

func TestMeanIssueTime(t *testing.T) {
	time, err := mean_issue_time(issues)
	if err != nil {
		t.Fatalf(`Failed to calculate issue time: Error: %v`, err)
	}
	if time != 3.1457826967592593 {
		t.Fatalf("Incorrect issue time: issue time in days should be 3.1457826967592593, calculated %v", time)
	}
}
