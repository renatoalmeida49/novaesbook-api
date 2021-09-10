module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        type: {
            type: Sequelize.STRING
        },
        body: {
            type: Sequelize.TEXT
        }
    })

    return Post
}