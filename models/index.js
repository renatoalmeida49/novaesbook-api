const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user-model')(sequelize, Sequelize)
db.posts = require('./post-model')(sequelize, Sequelize)
db.userRelations = require('./user-relation-model')(sequelize, Sequelize)
db.postLikes = require('./post-like-model')(sequelize, Sequelize)
db.postComments = require('./post_comment-model')(sequelize, Sequelize)

module.exports = db