module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        bithdate: {
            type: Sequelize.DATE
        },
        city: {
            type: Sequelize.STRING
        },
        work: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        cover: {
            type: Sequelize.STRING
        }
    })

    return User
}