const express = require('express');
const router = express.Router();

// @route   GET api/todos/test
// @desc    Test todos route
// @access  Public
router.get('/test', (req,res) => res.json({msg: "To do works"}));

module.exports = router;