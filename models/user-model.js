const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const bcrypt = require("bcryptjs");

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
        message: {
            type: [MessageSchema],
            required: true,
            default: []
        }
    }
)

UserSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if (error) {
            return callback(error)
        } else {
            callback(null, isMatch)
        }
    })
}



const User = mongoose.model('User',UserSchema);

module.exports = {
    User
}
