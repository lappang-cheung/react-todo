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

## Creating Backend Server

Need to create a backend server in order to communcation with MongoDB local

1. Create a folder called "lib"

~~~~~
+-- lib
~~~~~

2. Create a file called "server.js" inside the "lib" folder

~~~~~
+-- lib
|   +-- server.js
~~~~~

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

~~~~~
+-- config
|   +-- keys.js
~~~~~

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

9. Create a folder called "models" and model called "Todo.js"

~~~~~
+-- models
|   +-- todo.js
~~~~~

10. In "Todo.js" create the schema

Todo.js - File
~~~~~
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);
~~~~~

11. Creating the folder called "routes" and subfolder called "api", then create a file called "todo.js" 

~~~~~
+-- routes
|   +-- api
|       +-- todo.js
~~~~~

12. In todo.js we will create the routes for get all post, create post and delete post.

todo.js - File

~~~~
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../../models/Todo');

router.get('/test', (req,res) => res.json({msg: "To do works"}));

router.post('/new', (req,res) => {
    console.log(req.body)
    const todo = new Todo({
        description: req.body.text
    });

    todo.save()
        .then(todo => res.status(200).json(todo))
});

router.delete('/:id', (req,res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            todo.remove().then(() => res.json({
                success: true
            }))
            .catch(err => res.status(404).json({todonotfound: 'Task item not found'}))
        })
})

outer.get('/', (req,res) => {
    Todo.find()
        .sort({date: -1})
        .then(todos => res.json(todos))
        .catch(err => res.status(404).json({
            notodofound: 'No task items found'
        }));
});

module.exports = router;
~~~~

13. Add in the keys, mongoose conecting to MongoDB and the routing for the "server.js"

server.js - File
~~~~
//Some code

const db = require('../config/keys').MONGO_URI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Some code

app.get('/', (req,res) => {
    res.send('Hello world');
})
app.use('/todo', todo);

//Some code
~~~~

## Modifying componentDidMount

Remove the logic for local storage and need to implement axios get

~~~~~
componentDidMount(){
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
~~~~~

to 

~~~~~
refresh = () => {
    axios.get("/todo")
        .then(res => {      
            this.setState({
                itemList: res.data
        })
    })
}

componentDidMount(){
        this.refresh()
}
~~~~~

Delete

~~~~~
componentDidUpdate(){
    const json = JSON.stringify(this.state.itemList);
    localStorage.setItem('itemList', json);
}
~~~~~

## Modifying Delete Task

Remove the local storage of adding and implementing the axios route calls

~~~~~
this.setState((prevState) =>({
    itemList: prevState.itemList.filter((item) => {
        return removeItem !== item
    })
    })) 
~~~~~

to 

~~~~~
axios
    .delete(`/todo/${removeItem._id}`)
        .then(res => {
            console.log('Comment Deleted');
            this.refresh();
        })
        .catch(err => {
            console.log(err);
        }
    )
~~~~~

## Modifying Add Task

Remove the local storage of adding and implementing the axios route calls

~~~~~
onAddInput = () => {
    this.setState({
        item: '',
        itemList: [...this.state.itemList, this.state.item]
    })
}
~~~~~

to 

~~~~~
onAddInput = () => {
    axios.post('todo/new', {
        text: this.state.item
    })
    .then(
        res => console.log(res)
    )
    .catch(err => console.log(err));

    this.refresh();
        
    this.setState({
        item: ''
    });
}
~~~~~

## Modifying Package Json

Add the proxy for the backend and update the scripts

~~~~~
"proxy": "http://localhost:5000",

// Some configs

"scripts": {
    "client": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "server": "nodemon lib/server.js",
    "start": "concurrently --kill-others-on-fail \"yarn server\" \"yarn client\""
}
~~~~~