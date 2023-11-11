const User = require('../models/user-model').User
const aiController = require('./ai-controller')

async function createUser(req, res) {
    const name = req.body.name
    const lastname = req.body.lastname
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await new User({
            name: name,
            lastname: lastname,
            username: username,
            password: password
        }).save();
        res.status(200).json({
            message: "User successfully created",
            obj: user
        })
    } catch (e) {
        res.status(400).json({
            message: "Error creating user",
        })
    }
}

async function login(req, res){
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await User.findOne({
            username: username,
            password: password
        })
        if(user) {
            res.status(200).json({
                message: "Success",
                obj: user
            })
        } else {
            res.status(401).json({
                message: "Wrong user or password",
                obj: null
            })
        }
    } catch (e) {
        res.status(500).json(
            {
                message: "error",
                error: e
            }
        )
    }
}

async function sendMessage(req, res){
    const image = req.body.image
    const message = req.body.message
    try {
        if(image){
            const response = await aiController.image(image)
            res.status(200).json({
                message: "Success",
                obj: response
            })
        }
        else if(message) {

        }
    }
    catch (e) {

    }
}

module.exports = {
    createUser,
    login,
    sendMessage
}
