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
- [Bonus Strikethrough](#bonus-strikethrough)

## Installation of App

In order to install the app do the following:

* `yarn install` to install the local packages
* `yarn start` to run the application

Note: Since the remove method is using filters method, any duplication will be erased from the array

If failed to use yarn then use the following:

* `npm run install`
* `npm run start`

## Adding Local Storage

In order to use local storage we need to modify the App.js from:

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

to

~~~~
state = {
        item: '',
        itemList:[]
    }

/* Added */
componentDidUpdate(){

}

/* Added 8?
componentDidMount(){

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

In componentDidUpdate, we need to convert the JavaScript into a string in order to use the localStorage since it stores everything as a string.

1. Declare a variable to store the string version of the JavaScript Object
2. Use localStorage setItem method to store the string

~~~~
componentDidUpdate(){
    const json = JSON.stringify(this.state.itemList);
    localStorage.setItem('itemList', json);
}
~~~~

## Adding componentDidMount

In componentDidMount, we need to get the data back from the local storage and parse back into the JavaScript to be displayed by the React view.

1. Declare a variable to store the string data from local storage
2. Declare a variable to store the JavaScript object from the parse string data
3. Check if the JavaScript is null, and if is then do nothing or else set the state of the itemList array
4. Use try catch statement to ensure no errors

~~~~
componentDidUpdate(){
    try{
        const json = localStorage.getItem('itemList');
        const itemList = JSON.parse(json);

        if(itemList){
            this.setState({itemList})
        }
    }catch(e){
        // Do nothing
    }
}
~~~~