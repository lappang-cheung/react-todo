There are four version of this application:
1. Simple and generic with no local storage (Check branch no-storage)
2. Simple and generic with local storage (Check branch local-storage)
3. Simple and generic with mongo database (Check branch mongo-storage)
4. Auth and generic with mongo database (Check branch master)

## Table of Contents
- [Installation of App](#installation-of-app)
- [Challenges of User Auth](#challenges-of-user-auth)
- [Restructuring Backend Server Folder](#restructuring-backend-server-folder)

## Installation of App

In order to install the app do the following:

* `yarn install` to install the local packages
* `yarn start` to run the application for backend and frontend

Note: Since the remove method is using filters method, any duplication will be erased from the array

If failed to use yarn then use the following:

* `npm run install`
* `npm run start`

## Challenges of User Auth

The challenging of any user authenication app is handling the encrypting of the user password and private routes.
For user password encryption, the 'bcryptjs' package was used to create a hash and store the hash password in the database.

As well I use the 'jwttoken' in order to create the authentication for the private routes, so when an user was log in and
the authenication method would stick the token into the local storage. If the jwt token was not found in the browser than 
redirects to the login page.

Another challenge was the backend routing, as in the previous iteration the app could directly save into the database
and it wasn't issue because there was no issue association. However due to the user assocation, the routes for the task
had to be modified to make the task match the current user and then displayed the task.

## Restructuring Backend Server Folder

In the previous iteration of the mongo storage version:

~~~~~
+-- config
|   +-- keys.js
+-- lib
|   +-- server.js
+-- models
|   +-- Todo.js
+-- public
|   +-- index.html
|   +-- manfiest.json
+-- routes/api
|   +-- todo.js
+-- src
|   +-- components
|       +-- App.js
|       +-- Counter.js
|       +-- Todo.js
|       +-- TodoList.js
|       +-- TodoView.js
|   +-- styles
|       +-- App.css
|   +-- index.js
~~~~~

Will be modified into this folder structure 

~~~~~
+-- lib
|   +-- server.js
|   +-- config
|      +-- keys.js
|      +-- passport.js
|   +-- models
|       +-- Task.js
|       +-- User.js
|   +-- routes
|       +-- task.js
|       +-- user.js
|   +-- validation
|       +-- tasks
|           +-- validateTaskInput.js
|       +-- users
|           +-- login.js
|           +-- register.js
|       +-- is-empty.js
~~~~~

The reasoning for this folder restructuring is simplicity and able to sort our logic for specific functions