IN PROGRESS

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

There are three version of this application:
1. Simple and generic with no local storage (Check branch no-storage)
2. Simple and generic with local storage (Check branch local-storage)
3. Simple and generic with mongo database (Check branch mongo-storage)
4. Auth and generic with mongo database (Check branch master)

## Table of Contents
- [Installation of App](#installation-of-app)
- [Adding Local Storage](#adding-local-storage)
- [Adding componentDidUpdate](#adding-componentDidUpdate)
- [Adding componentDidMount](#adding-componentDidMount)

## Installation of App

In order to install the app do the following:

* `yarn install` to install the local packages
* `yarn start` to run the application

Note: Since the remove method is using filters method, any duplication will be erased from the array

If failed to use yarn then use the following:

* `npm run install`
* `npm run start`

## Adding Local Storage

In order to install local storage we need to modify the App.js from:

~~~~
state = {
        item: '',
        itemList:[]
    }

onChange = (event) => {
        this.setState({
            item: event.target.value
        })
}

onDeleteInput = (removeItem) => {
    this.setState((prevState) =>({
        itemList: prevState.itemList.filter((item) => {
                return removeItem !== item
        })
    })) 
}
~~~~

## Adding componentDidUpdate

## Aadding componentDidMount