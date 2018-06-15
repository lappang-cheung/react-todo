const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');

// @route   GET /uaer/test
// @desc    Test user route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "Users works"}));

// @route   POST /user/signup
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

// @route   POST /user/login
// @desc    login user
// @access  Public
router.post('/login', (req,res) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                if(user.password === req.body.password){
                    return res.status(200).json({ msg: 'User has login'})
                    res.redirect('../../todo/')
                }else{
                    return res.status(401).json({ msg: 'Unauthorized access'})
                }
            }else{
                return res.status(400).json({ msg: 'Email not found'})
            }
        });
});

module.exports = router;