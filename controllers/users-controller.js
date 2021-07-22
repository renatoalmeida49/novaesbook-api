const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.users

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({
                error: errBcrypt
            })
        }

        const user = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            birthdate: req.body.birthdate
        }

        User.create(user)
            .then(data => {
                res.status(201).send({
                    message: "User created",
                    user: {
                        name: data.name,
                        email: data.email
                    },
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err
                })
            })
    })
}