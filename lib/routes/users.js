const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Load config
const keys = require('../configs/keys')

// Load model
const User = require('../models/User')

// Load validation
const validateRegisterInput = require('../validation/users/register')
const validateLoginInput = require('../validation/users/login')

/*
 * @route   GET /users/test
 * @desc    Testing route
 * @access  Public
 */
router.get('/test', async (req,res,next) => {
    try{
        const docs = await {message: 'User routing test'}
        res.status(200).send(docs)
    }catch(e){
        next(e)
    }
});

/*
 * @route   POST /users/signup
 * @desc    Signup route
 * @access  Public
 */
router.post('/signup', async (req,res, next) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    try{
        // Check if user used the email
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
            // Create the hash for the password
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

/*
 * @route   POST /users/login
 * @desc    Login route
 * @access  Public
 */
router.post('/login', (req,res) => {

    const { errors, isValid } = validateLoginInput(req.body)

    // Check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .then(user => {
            // Check for user
            if(!user){
                errors.email = 'User not found'
                return res.status(400).json(errors)
            }

            // Check for password validation
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        // User match
                        const payload = { id: user.id, name: user.name } // Create JWT payload
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

/*
 * @route   GET /users/current
 * @desc    Return current user
 * @access  Private
 */
router.get('/current', passport.authenticate('jwt', {session: false }), (req,res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router