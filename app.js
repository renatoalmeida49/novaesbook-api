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

//-----------ROUTES--------------
const routeUsers = require('./routes/users-router')
const routePosts = require('./routes/posts-router')
const routeRelations = require('./routes/user-relations-router')

app.use(morgan('dev'))
app.use(express.urlencoded({extend: false}))
app.use(express.json())
app.use(cors())

//----------REGISTER ROUTES ----------
app.use('/users', routeUsers)
app.use('/posts', routePosts)
app.use('/relations', routeRelations)

app.use((req, res, next) => {
    return res.status(200).send({
        mensagem: "Muitos dirão que você não é capaz. Acredite neles."
    })
})

module.exports = app