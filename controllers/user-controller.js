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
            user.messages.push({sender: 1, role: "user", content: "Image"})
            user.messages.push({sender: 0, role: "assistant", content: response})

            await user.save()
            res.status(200).json({
                message: "Success",
                obj: user
            })
        }
        else if(message) {
            const user = await User.findOne({username: username})
            user.messages.push({sender: 1, role: "user", content: message})
            await user.save()

            const messages = await User.findOne({
                username: username
            }, {
                'messages.role': 1,
                'messages.content': 1,
                _id: 0
            })
            chat =  await getMessagesOpenAi(username);

            const response = await aiController.chat(chat)
            user.messages.push({sender: 0, role: "assistant", content: response})
            await user.save()
            res.status(200).json({
                message: response,
                obj: response
            })
        }
        else {
            res.status(404).json({
                message: "Please add aa message or image"
            })
        }
    }
    catch (e) {
        res.status(400).json({
            error: {
                name: e.name,
                message: e.message,
                stack: e.stack,
              },
            message: "error"
        })
    }
}

async function getUserMessages(req, res){
    const username = req.params.username;
    try {
        const messages = await User.findOne({
            username: username
        },{
            'messages.sender': 1,
            'messages.content': 1
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


async function deleteUserMessages(req, res){
    const username = req.params.username;
    console.log('user', username);
    try {
        const messages = await User.findOne({
            username: username
        },{
            'messages.sender': 1,
            'messages.content': 1
        })
        messages.delete();



    } catch(e) {
        res.status(400).json({
            message: "Error getting user messages",
            error: e
        })
    }

}

async function getMessagesOpenAi(username){

    try {
        const messages = await User.findOne({
            username: username
        }, {
            'messages.role': 1,
            'messages.content': 1,
            _id: 0
        })
        return messages;
    } catch (e) {
        console.log(e.message)
    }
}

async function deleteAllMessages(req, res){
    const username = req.params.username
    try {
        const result = await User.updateOne(
            { username: username },
            {
                $pull: {
                    messages: {
                        _id: { $ne: (await User.findById(userId)).messages[0]._id },
                    },
                },
            }
        );
        res.status(200).json({
            message: "Messages deleted",
            obj: result
        })
    } catch (e){
        res.status(500).json({
            message: "Error",
            error: e
        })
    }
}

module.exports = {
    createUser,
    login,
    sendMessage,
    getUserMessages,
    getMessagesOpenAi,
    deleteUserMessages,
    deleteAllMessages
}
