const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);