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
2. Create a file called "server.js" inside the "lib" folder
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

//server.js
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

## Adding MongoDB Storage

Need to create the 