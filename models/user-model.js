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
        role: {
            type: String,
            required: true,
            default: " "
        },
        content: {
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
            default: [
                {
                    sender: false,
                    role: "system",
                    content: "Eres un asistente de primeros auxilios, si con la información dada por el usuario, determinas que necesita irse a un hospital de emergencia, no le des ninguna instrucción, directamente dile que necesita ir a urgencias"
                }
            ]
        }
    }
)

const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}
