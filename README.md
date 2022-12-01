# sweng-analysis

## About the repository 

* Created for third year module in Computer Science Trinity College, CSU33012 Software Engineering.
* This repository is designed to gather information about this github repository and calculate 
  interesting statistics for determining the productivity of a software engineer and team.
* This project was written using **GO** and **Vue**.
* API calls were done using **go-github**.

## Compatability

* Windows
    - Requires WSL
* Mac
    - Requires Windows Bootcamp and WSL
* Linux
    - Native Compatability

## Instructions for Setup

* Running App from Dockerhub
    1. Pull docker image of web app.
        * Option 1: Pull web app version using `docker pull asepelenco/sweng_analysis:v2.0.0`.
    2. Run the docker image using `docker run --expose 9090 -p 9090:9090 --expose 5173 -p 5173:5713 -ti --rm -ti --network=host asepelenco/sweng_analysis:v2.0.0`.
        * `--expose 5173`, `--expose 9090` and `-p 5173:5173`, `-p 9090:9090` ensures the port `5173` as well as using `--network=host`is exposed and allows you to access the web
          with the docker image.
    3. Run the command in the background using `npm run dev &` and clear the screen by typing pressing `Ctrl+l` or typing `clear`.
    4. Run the go code with `go run src/main.go`
    5. Input your github access token, this is necessary in order to not be limited to 60 api calls per hour.
    6. Open up your web browser and type `127.0.0.1:5173` to launch the frontend and in a different tab type in `localhost:9090` to launch the backend..
* Running App using Docker (not from Dockerhub) (This can only be the web app version)
    1. Execute command `docker build -t sweng-analysis .` in root directory of the project (sweng-analysis).
    2. Execute command `docker run --expose 9090 -p 9090:9090 --expose 5173 -p 5173:5173 -ti --network=host --rm sweng-analysis`.
    3. Repeat steps 3 to 6 for Running App from Dockerhub.
* Running App locally
    1. Clone repository with `git clone https://github.com/alexandersep/sweng-analysis.git`.
    2. Enter sweng-analysis/ with `cd sweng-analysis`.
    3. Ensure that you have nodejs 16, nodejs dev, Go version 1.19.3 or above installed.
    4. Install and launch frontend with `npm -f install`n build`, then `npm run dev &`.
    6. Repeat steps 4 and 6 for Running App from DockerHub.

### Contributors

Adam Beaty, Beattyad@tcd.ie  
Adriana Hrabowych, hrabowya@tcd.ie   
Brandon Paisley, paisleyb@tcd.ie   
Gerald Paris, gparis@tcd.ie  
Daniel Penrose, penrosed@tcd.ie  
Niall Sauvage, sauvagen@tcd.ie    
Alexander Sepelenco, sepelena@tcd.ie     
Wesley Shaw, Weshaw@tcd.ie

## Sources

https://github.com/carbon-language/carbon-lang  
https://hub.docker.com/
