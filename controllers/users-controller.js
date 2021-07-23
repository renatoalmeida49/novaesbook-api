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

exports.signIn = (req, res, next) => {
    const user = User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user === null) {
                return res.status(400).send({
                    message: "User or password not found"
                })
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).send({
                        message: "Falha na autenticação",
                        error: err
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        birthdate: user.birthdate,
                        city: user.city,
                        work: user.work,
                        avatar: user.avatar,
                        cover: user.cover
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    })

                    return res.status(200).send({
                        mensagem: "Autenticado com sucesso",
                        user: {
                            email: user.email,
                            nome: user.nome
                        },
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            return res.status(401).send({
                message: "Failed to search for user",
                error: err
            })
        })
}