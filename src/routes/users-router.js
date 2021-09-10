const express = require('express')
const router = express.Router()

const login = require('../middlewares/login')

const UsersController = require('../controllers/users-controller')

router.post('/sign-up', UsersController.signUp)
router.post('/sign-in', UsersController.signIn)
router.put('/update', login.login, UsersController.update)
router.post('/profile', login.login, UsersController.profile)
router.get('/', login.login, UsersController.profile)

module.exports = router