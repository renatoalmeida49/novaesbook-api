module.exports = (sequelize, Sequelize) => {
    const PostComment = sequelize.define("post_comment", {
        body: {
            type: Sequelize.TEXT
        }
    })

    return PostComment
}