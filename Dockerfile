# start with a base image
FROM ubuntu:latest
MAINTAINER Paper Jam Team <hackfmi5-paperjam@github.com>

# install npm & nodeJS
RUN apt-get update
RUN apt-get install -y nodejs=0.10.29
RUN apt-get install -y npm

# install mongoDB 3.0.2
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
RUN apt-get update
RUN apt-get install -y mongodb-org=3.0.2 mongodb-org-server=3.0.2 mongodb-org-mongos=3.0.2 mongodb-org-tools=3.0.2

# Bundle app source
COPY ./web/MountainTracker /src

# Ensure mongoDB as a folder
CMD mkdir -p data/db

# Install app dependencies
RUN cd /src; npm install

# expose port 8000 for node and 27017 for mongo
EXPOSE 8000 27017

# Run app
CMD mongod --dbpath data/db &
CMD node /src/bin/www

