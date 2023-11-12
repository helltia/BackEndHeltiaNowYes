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
            })
        } else {
            res.status(401).json({
                message: "Wrong user or password",
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
    const username = req.body.username
    try {
        if(image){
            const response = await aiController.image(image)
            const user = await User.findOne({username: username})
            user.messages.push({sender: 0, message: "dos"})

            await user.save(

            )
            res.status(200).json({
                message: "Success",
                obj: user
            })
        }
        else if(message) {
            const response = null
            res.status(200).json({
                message: "Success",
                obj: response
            })
        }
    }
    catch (e) {
        res.status(400).json({
            error: e,
            message: "error"
        })
    }
}

async function getUserMessages(req, res){
    const username = req.body.username;
    try {
        const messages = await User.findOne({
            username: username
        },{
            messages: 1
        })
        res.status(200).json({
            message: "All messages from user",
            obj: messages
        })
    } catch(e) {
        res.status(400).json({
            message: "Error getting user messages",
            error: e
        })
    }

}

module.exports = {
    createUser,
    login,
    sendMessage,
    getUserMessages
}
