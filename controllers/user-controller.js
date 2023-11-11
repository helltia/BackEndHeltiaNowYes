const User = require('../models/user-model').User

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

module.exports = {
    login
}
