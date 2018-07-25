const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const path = require('path')

// Custom configuration keys
const keys = require('./configs/keys')

// Setting up the port and app
const PORT = process.env.PORT || 5000;
const app = express();

/*
 * Body parser middleware
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * Note: Must be always in front of the custom routes* *
 * *       Weird issue with postman of errortype       * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// Loading custom routes
app.use('/users', require('./routes/users'))
app.use('/tasks', require('./routes/tasks'))

// Check for production
if(process.env.NODE_ENV === 'production'){
    // Load static folder
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

/*
 * Passport middleware
 * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * Note: Must be always after routes             * *
 * *       Schema will not be register error       * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 */ 
app.use(passport.initialize());
// Passport Config
require('./configs/passport')(passport);

/*
 * Send back an internal 500 error if server not alive 
 */
app.use((err, req, res, next) => {
    res.status(500).json({ err: err.toString() })
});

/*
 * Testing route
 * Send back response of backend server alive & started 
 */
app.get('/', async (req,res,next) => {
    try{
        const docs = await {message: 'Backend server alive'}
        res.status(200).send(docs)
    }catch(e){
        next(e)
    }
});

/* 
 * 1. Checking for mongoose connection
 * 2. Logging out the port used to console
 */
app.listen(PORT, async () => {
    await mongoose.connect(keys.mongoURI);
    console.log(`Listening to on ${PORT}`)
});