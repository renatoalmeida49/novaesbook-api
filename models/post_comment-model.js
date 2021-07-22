module.exports = (sequelize, Sequelize) => {
    const PostComment = sequelize.define("post_comment", {
        id_post: {
            type: Sequelize.INTEGER
        },
        id_user: {
            type: Sequelize.INTEGER
        },
        body: {
            type: Sequelize.TEXT
        }
    })

    return PostComment
}