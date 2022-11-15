package main

import (
	"context"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/go-github/v48/github"
)

type metrics struct {
	Owner          string         `json:"owner"`
	Repo           string         `json:"repo"`
	Languages      map[string]int `json:"languages"`
	Commit_Average int            `json:"average_commits_this_year"`
}

var user_metrics = metrics{}

func getMetrics(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "http://localhost:8080")
	context.IndentedJSON(http.StatusOK, user_metrics)
}

func populate_metrics(owner, repo string, languages map[string]int, commit_avg int) {
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

func main() {
	var owner = "torvalds"
	ctx := context.Background()
	client := github.NewClient(nil)
	input_repo := "linux"
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
	populate_metrics(owner, input_repo, languages, commit_avg)
	init_server()
}
