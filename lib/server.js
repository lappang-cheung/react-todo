// Required classes
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Port
const PORT = process.env.PORT || 5000;

// Routes
const todo = require('../routes/api/todo');
const user = require('../routes/api/user');

// Creating the app instance
const app = express();

// Using body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// DB Config
const db = require('../config/keys').MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Dummy link to see if working
app.get('/healthcheck', (req,res) => {
    res.status(200).json({msg: 'I am working'});
})

// Use Routes
app.use('/todo', todo);
app.use('/user', user);

// Setting the app's port
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})