const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const db = require('./models/index')

// MODE PROD
db.sequelize.sync()

// MODE DEV
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.")
// })

app.use(morgan('dev'))
app.use(express.urlencoded({extend: false}))
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    return res.status(200).send({
        mensagem: "A luta é grande, mas a derrota é certa"
    })
})

module.exports = app