const express = require('express')
const router = express.Router()

const login = require('../middlewares/login')

const RelationsController = require('../controllers/relations-controller')

router.post('/', login.login, RelationsController.relation)

module.exports = router