const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: new Date()
    }
})

module.exports = Task = mongoose.model('tasks', taskSchema)