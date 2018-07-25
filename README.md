Readme - In progress

There are four version of this application:
1. Simple and generic with no local storage (Check branch no-storage)
2. Simple and generic with local storage (Check branch local-storage)
3. Simple and generic with mongo database (Check branch mongo-storage)
4. Auth and generic with mongo database (Check branch master)

## Table of Contents
- [Installation of App](#installation-of-app)
- [Challenges of User Auth](#challenges-of-user-auth)
- [Restructuring Backend Server Folder](#restructuring-backend-server-folder)
- [Adding and Modifying Models](#adding-and-modifying-models)
- [Adding and Modifying Routes](#adding-and-modifying-routes)
- [Adding and Modifying Config](#adding-and-modifying-config)
- [Implementing Passport into Routes](#implementing-passport-into-routes)
- [Deploying to Heroku](#deployingtoheroku)

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

## Adding and Modifying Models

In the model folder, create a new model called "User.js" and create basic require enities:

User.js - Model
~~~~
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
~~~~

And then modify & Rename the "Todo.js" to "Task.js" with the modification code to:

Todo.js - Model
~~~~
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
~~~~

to

Task.js - Model
~~~~
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = Task = mongoose.model('tasks', taskSchema)
~~~~

Note: Title has been added and as well as the user reference by id whom create the task

## Adding and Modifying Routes

In the model folder, create a new model called "users.js" and this create the routes for API calls for the frontend

users.js - Routes
~~~~
const express = require('express')
const router = express.Router()

const keys = require('../configs/keys')

const User = require('../models/User')

router.get('/test', async (req,res,next) => {
    try{
        const docs = await {message: 'User routing test'}
        res.status(200).send(docs)
    }catch(e){
        next(e)
    }
});

module.exports = router
~~~~

Note: Import the keys & User model, declare the const route from express in order to do the routing

Now modified and rename the "todo.js" to "tasks.js" with similar structure to "users.js"

todo.js - Route
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

router.get('/', (req,res) => {
    Todo.find()
        .sort({date: -1})
        .then(todos => res.json(todos))
        .catch(err => res.status(404).json({
            notodofound: 'No task items found'
        }));
});

module.exports = router;
~~~~

to 

tasks.js - Route
~~~~
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Task = require('../models/Task')
const User = require('../models/User')

router.get('/test', async (req,res,next) => {
    try{
        const docs = await {message: 'Task routing test'}
        res.status(200).send(docs)
    }catch(e){
        next(e)
    }
})

module.exports = router
~~~~

Note: Import the model both User and Task because in order to create a task, the user must be validated

## Adding and Modifying Config

In the config folder, open up "keys.js" and add the new entity for the secret key

keys.js - configs
~~~~
module.exports =
{
    mongoURI: 'mongodb://localhost:27017/todo'
}
~~~~

to

keys.js - configs
~~~~
module.exports =
{
    mongoURI: 'mongodb://localhost:27017/todo',
    secretOrKey: 'secret'
}
~~~~

Now using passport to verify our authenication and import the following classes:
passport-jwt - npm
mongoose - npm

Then create a file called "passport.js" with the following code

passport.js - configs
~~~~
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

const User = mongoose.model('users')
const keys = require('../configs/keys')

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
    }));
};
~~~~

From the passport documentation, a Jwt Strategy is needed for extracting the token and
this particular code uses the secret key to decode the token.

## Implementing Passport into Routes

In the routes for the user, install the following classes:
bcryptjs - npm
jsonwebtoken - npm
passport - npm

Import those package into the file, as load the models and config

user.js - routes
~~~~
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')


const keys = require('../configs/keys')
const User = require('../models/User')
~~~~

Now create the routing request for signup where it encrypt the password into a hash

user.js - routes
~~~~
router.post('/signup', async (req,res, next) => {

    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            res.status(400).json({ email: 'Already been used!!'})
        }else{
            // Create new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    }catch(e){
        next(e)
    }
});
~~~~

Now create the routing request for the login and the password would be decrypt from the hash

users.js - route
~~~~
router.post('/login', (req,res) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user){
                errors.email = 'User not found'
                return res.status(400).json(errors)
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = { id: user.id, name: user.name } 
                        // Sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 60 * 60 * 24 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        )
                    } else {
                        errors.password = 'Password incorrect'
                        return res.status(400).json(errors)
                    }
                })
        })
});
~~~~

## Deploying to Heroku

In order to deploy the Heroku environment, here are the list of things which needs to be done:

1. Heroku account (Register and etc)
2. Update the package.json script to make sure the front has a "build" folder
3. Push all the changes after commiting to heroku