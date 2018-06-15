const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');

// @route   GET api/todos/test
// @desc    Test todos route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "Users works"}));

// @route   POST api/user/signup
// @desc    Create user
// @access  Public
router.post('/signup', (req,res) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({ msg: 'Email already used'})
            }else{
                const user = new User({
                    email: req.body.email,
                    password: req.body.password
                })

                user.save()
                .then(user => res.status(200).json(user))
            }
        });

});

// @route   POST api/user/user
// @desc    login user
// @access  Public
router.post('/login', (req,res) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(200).json({ msg: 'Email found'})
            }else{
                return res.status(400).json({ msg: 'Email not found'})
            }
        });
});

module.exports = router;