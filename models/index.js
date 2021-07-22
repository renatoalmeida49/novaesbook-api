const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


module.exports = db