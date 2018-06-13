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
})

module.exports = router;