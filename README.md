In progress

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

There are four version of this application:
1. Simple and generic with no local storage (Check branch no-storage)
2. Simple and generic with local storage (Check branch local-storage)
3. Simple and generic with mongo database (Check branch mongo-storage)
4. Auth and generic with mongo database (Check branch master)

## Table of Contents
- [Installation of App](#installation-of-app)
- [Creating Backend Server](#creating-backend-server)
- [Adding MongoDB Storage](#adding-mongodb-storage)
- [Creating A Model](#creating-a-model)
- [Modifying componentDidMount](#adding-componentdidmount)
- [Modifying Delete Task](#modifying-delete-task)
- [Modifying Add Task](#modifiying-add-task)

## Installation of App

In order to install the app do the following:

* `yarn install` to install the local packages
* `yarn start` to run the application for backend and frontend

Note: Since the remove method is using filters method, any duplication will be erased from the array

If failed to use yarn then use the following:

* `npm run install`
* `npm run start`

## Creating Backend Server

Need to create a backend server in order to communcation with MongoDB local

1. Create a folder called "lib"

+-- lib

2. Create a file called "server.js" inside the "lib" folder

+-- lib
|   +-- server.js

3. Yarn or npm install packages: axios, express, mongoose, nodemon and concurrently in terminal

Yarn Installation
~~~~~
yarn add axios express mongoose nodemon concurrently
~~~~~

or 

NPM installation
~~~~~
npm install --save axios express mongoose nodemon concurrently
~~~~~

4. In "server.js" declare the variables, port and basic routes

server.js - File
~~~~~
const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req,res) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log('Listening to port: ${PORT}`)
})
~~~~~

5. Install body-parser for parsing the HTTP request body and mongoose for connect to MongoDB

~~~~~
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser);

const PORT = process.env.PORT || 5000;

//Some code
~~~~~

6. Use the body-parser after creating the app instance

~~~~~
//Some code

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Some code
~~~~~

7. Creating a folder called "config", then inside create a file called "keys.js" and declare the local mongo uri

.
+-- _config
|   +-- _keys.js

keys.js - File
~~~~~
module.exports = {
    MONGO_URI: 'mongodb://localhost:27017/todoApp'
}
~~~~~

8. Creating the MongoDB connection 

server.js - File
~~~~~
//Some code

const db = require('../config/keys').MONGO_URI;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('Hello world');
})

//Some code 
~~~~~


## Adding MongoDB Storage

Need to create the 