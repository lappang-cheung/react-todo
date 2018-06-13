const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../../models/Todo');

// @route   GET api/todos/test
// @desc    Test todos route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "To do works"}));

// @route   POST api/todos
// @desc    Create post
// @access  Public
router.post('/new', (req,res) => {
    const todo = new Todo({
        description: req.body.text
    });

    todo.save()
        .then(todo => res.json(todo))
});

// @route   Get api/todos
// @desc    Get posts
// @access  Pulic
router.get('/', (req,res) => {
    Todo.find()
        .sort({date: -1})
        .then(todos => res.json(todos))
        .catch(err => res.status(404));
});

module.exports = router;