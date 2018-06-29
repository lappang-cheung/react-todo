const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load model
const Task = require('../models/Task')
const User = require('../models/User')

// Load validation
const validateTaskInput = require('../validation/tasks/validateTaskInput')

/*
 * @route   GET /tasks/test
 * @desc    Testing route
 * @access  Public
 */
router.get('/test', async (req,res,next) => {
    try{
        const docs = await {message: 'Task routing test'}
        res.status(200).send(docs)
    }catch(e){
        next(e)
    }
})

/*
 * @route   POST /tasks
 * @desc    Create task by user
 * @access  Private
 */

router.post('/', passport.authenticate('jwt', { session: false }), async (req,res, next) => {

    const {errors, isValid } = validateTaskInput(req.body);

    // Check validation
    if(!isValid){
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    try{

        const newTask = await new Task({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        })

        newTask.save().then(task => res.json(task))

    } catch(e) {
        next(e) 
    }
})

/*
 * @route   GET /tasks
 * @desc    Get all task by user
 * @access  Private
 */

router.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    
    Task.find({'user': req.user._id})
        .sort({date: -1})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404).json({
            notasksfound: 'No post found with that id'
        }))
})

/*
 * @route   GET /tasks/:id
 * @desc    Get a single task by user
 * @access  Private
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    User.findOne({ user: req.user.id})
        .then(user => {
            Task
                .findById(req.params.id)
                .then(task => res.json(task))
                .catch(err => res.status(404).json({
                    notaskfound: 'No task found with that id'
                }));
        })
        .catch(err => res.status(404).json({
            tasknotfound: 'No task found'
        }))
})

/*
 * @route   DELETE /tasks/:id
 * @desc    Delete posts
 * @access  Private
 */
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    User.findOne({ user: req.user.id})
        .then(user => {
            Task.findById(req.params.id)
            .then(task => {
                // Check for task owner
                if(task.user.toString() !== req.user.id){
                    return res.status(401).json({ notauthorized: 'User not authorized'});
                }
                task.remove().then(() => res.json({ success: true}))
            })
            .catch(err => res.status(404).json({
                tasknotfound: 'No post found'
            }))
        })
});

module.exports = router