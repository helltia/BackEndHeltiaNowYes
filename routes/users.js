var express = require('express');
var router = express.Router();
const userController = require('../controllers/user-controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.post('/sendMessage', userController.sendMessage);
router.get('/messages/:username', userController.getUserMessages);
router.get('/messageOpenAi/:username', userController.getMessagesOpenAi);
router.delete('/messages/:username', userController.deleteUserMessages);
router.delete('/allMessages/:username', userController.deleteAllMessages)

module.exports = router;
