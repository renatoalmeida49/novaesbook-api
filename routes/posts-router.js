const express = require('express')
const router = express.Router()

const login = require('../middlewares/login')

const PostsController = require('../controllers/posts-controller')

router.post('/', login.login, PostsController.homePage)
router.post('/new-post', login.login, PostsController.create)

module.exports = router