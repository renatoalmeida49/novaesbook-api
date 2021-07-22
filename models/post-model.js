module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        id_user: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        body: {
            type: Sequelize.TEXT
        }
    })

    return Post
}