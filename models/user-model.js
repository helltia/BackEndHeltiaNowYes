const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: Boolean,
            required: true,
            default: true
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
        name: {
          type: String,
          required: true,
          default: " "
        },
        lastname: {
          type: String,
          required: true,
          default: " "
        },
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
        messages: {
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
