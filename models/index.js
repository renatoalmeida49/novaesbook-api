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

// ------- RELATIONS -------

// USER has many POSTS 
db.users.hasMany(db.posts, { as: "posts" })
db.posts.belongsTo(db.users, {
    foreignkey: "userId",
    as: "user"
})

// USER has many COMMENTS in POSTS
db.users.hasMany(db.postComments, { as: "comments" })
db.postComments.belongsTo(db.users, {
    foreignkey: "userId",
    as: "user"
})

db.posts.hasMany(db.postComments, { as: "comments" })
db.postComments.belongsTo(db.posts, {
    foreignkey: "postId",
    as: "post"
})

// USER has many LIKES in POSTS
db.users.hasMany(db.postLikes, { as: "likes"})
db.postLikes.belongsTo(db.users, {
    foreignkey: "userId",
    as: "user"
})

db.posts.hasMany(db.postLikes, { as: "likes" })
db.postLikes.belongsTo(db.posts, {
    foreignkey: "postId",
    as: "post"
})

// USER has many FOLLOWERS
db.userRelations.belongsTo(db.users, {
    foreignkey: "userId",
    as: "from"
})
db.userRelations.belongsTo(db.users, {
    foreignkey: "userId",
    as: "to"
})
module.exports = db