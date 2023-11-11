const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: Boolean,
            required: true,
            default: false
        },
        message: {
            type: String,
            required: true,
            default: " "
        }
    }
)


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            default: " "
        },
        password: {
            type: String,
            required: true,
            default: " "
        },
        message: {
            type: [MessageSchema],
            required: true,
            default: []
        }
    }
)


const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}
