# Use latest version of ubuntu
FROM ubuntu:latest

# Create a Working directory
WORKDIR /sweng_analysis
# Optimisation, for Dockerfile caching
COPY package*.json ./ 
# COPY directory of git repository 
COPY . .

# Update repostiory and Install dependencies 
RUN apt update && apt install -y curl gcc g++ make apt-utils

# Install Nodejs 14 while removing old nodejs
RUN apt remove -y nodejs
RUN apt remove -y nodejs-doc 
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Install Node.js Dev Tools
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt install -y yarn

# Install and Setup Golang (Rum goland in docker image when booted it)
RUN curl -OL https://golang.org/dl/go1.19.3.linux-amd64.tar.gz
RUN tar -C /usr/local -xvf go1.19.3.linux-amd64.tar.gz
RUN rm go1.19.3.linux-amd64.tar.gz

# Install and Setup Vue for sweng_analysis
RUN npm -f install
RUN npm run build
RUN npm run dev &  

# Set localhost to 127.0.0.1 
RUN echo 127.0.0.1 localhost | tee -a /etc/hosts

# Ports needed to be exposed
# Vue Port
EXPOSE 5173 
# Go Port 
EXPOSE 9090

# Run Vue in the background, (should be on 127.0.0.1:5173), and run main from Go code, should be (localhost:9090/metrics) 
CMD ["/bin/bash"]
