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
- [Modifying componentDidMount](#modifying-componentdidmount)
- [Modifying Delete Task](#modifying-delete-task)
- [Modifying Add Task](#modifying-add-task)
- [Modifying Package Json](#modifying-package-json)

## Installation of App

In order to install the app do the following:

* `yarn install` to install the local packages
* `yarn start` to run the application for backend and frontend

Note: Since the remove method is using filters method, any duplication will be erased from the array

If failed to use yarn then use the following:

* `npm run install`
* `npm run start`

