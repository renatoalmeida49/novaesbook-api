const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users-controller')

router.post('/sign-up', UsersController.signUp)
router.post('/sign-in', UsersController.signIn)
router.put('/update', UsersController.update)

module.exports = router