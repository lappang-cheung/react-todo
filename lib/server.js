const express = require('express');
const mongoose = require('mongoose');

const todo = require('../routes/api/todo');

const app = express();

const PORT = process.env.PORT || 5000;

const  bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// DB Config
const db = require('../config/keys').MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req,res) => {
    res.send('Hello world');
})

// Use Routes
app.use('/todo', todo);

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})