<a href="https://codeclimate.com/repos/57b6fe3ca0a6785c0f005447/feed"><img src="https://codeclimate.com/repos/57b6fe3ca0a6785c0f005447/badges/16954e3421ec3f2402a7/gpa.svg" /></a>
<a href="https://codeclimate.com/repos/57b6fe3ca0a6785c0f005447/coverage"><img src="https://codeclimate.com/repos/57b6fe3ca0a6785c0f005447/badges/16954e3421ec3f2402a7/coverage.svg" /></a>
<a href="https://codeclimate.com/repos/57b6fe3ca0a6785c0f005447/feed"><img src="https://codeclimate.com/repos/57b6fe3ca0a6785c0f005447/badges/16954e3421ec3f2402a7/issue_count.svg" /></a>
<img src="https://travis-ci.org/bobbydxt8may/practoproject.svg?branch=master" alt="Build Status" />



bobbydxt8may/practoproject
#Expense Manager

A web app that helps users manage their expense


## Tech 
  - Express v4.13.4 (Stable) - fast node.js network app framework
  - AngularJS v1 - HTML enhanced for User Interfaces
  - Node.js v4.4.7 - evented I/O for the backend

### To Use

## Setting up Node and NPM
	```
		brew install npm
    	brew install node
    ```

## Clone the repository
	```
		git clone https://github.com/bobbydxt8may/practoproject
    ```
## Setup The Environment 
	```
		npm install 
		install mongodb refer http://www.bigspaceship.com/mongodb-on-mac/
		npm server.js

    ```
    

## Directory Layout

```
├── README.md
├── server
│   ├── config
│   ├── helper
│   ├── modules
│   ├── routes
├── src
│   ├── css
│   ├── sass
│   └── js
├── views
│   ├── partials
│   └── index.html
├── server.js
├── gulpfile.js
├── karma.conf.js
├── node_modules
├── bower_components
├── package.json
└── tests

### to use api and database
For API we are using Json Web Token

Sample setting file is provided at server/config/database sample.js

create a file name database.js at the same location with your credentials

