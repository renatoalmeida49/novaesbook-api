module.exports = (sequelize, Sequelize) => {
    const UserRelation = sequelize.define("user_relation", {
        user_from: {
            type: Sequelize.INTEGER
        },
        user_to: {
            type: Sequelize.INTEGER
        }
    })

    return UserRelation
}