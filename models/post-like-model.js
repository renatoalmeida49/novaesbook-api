module.exports = (sequelize, Sequelize) => {
    const PostLike = sequelize.define("post_like", {
        id_post: {
            type: Sequelize.INTEGER
        },
        id_user: {
            type: Sequelize.INTEGER
        }
    })

    return PostLike
}