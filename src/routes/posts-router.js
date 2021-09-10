const express = require('express')
const router = express.Router()

const login = require('../middlewares/login')

const PostsController = require('../controllers/posts-controller')

router.get('/', login.login, PostsController.homePage)
router.post('/new-post', login.login, PostsController.create)

router.post('/user-posts', login.login, PostsController.userPosts)

module.exports = router