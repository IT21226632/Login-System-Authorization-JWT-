const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please enter your first name']
    },

    lastName:{
        type: String,
        required: [true, 'Please enter your last name']
    },

    email:{
        type: String,
        required: [true, 'Please enter your email']
    },

    age:{
        type: Number,
        required: [true, 'Please enter your age']
    },

    password:{
        type: String,
        required: [true, 'Please enter your password']
    },

    rePassword:{
        type: String,
        required: [true, 'Confirme your password']
    },

    role:{
        type: String,
        required: [true, 'Confirme your password']
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)