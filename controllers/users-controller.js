const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.users
const Post = db.posts
const Relation = db.userRelations

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
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            birthdate: user.birthdate || '',
                            city: user.city || '',
                            work: user.work || '',
                            avatar: user.avatar || '',
                            cover: user.cover || ''
                        },
                        token: token
                    })
                }

                return res.status(401).send({
                    message: "User or password not found",
                })
            })
        })
        .catch(err => {
            return res.status(401).send({
                message: "Failed to search for user",
                error: err
            })
        })
}

exports.update = (req, res, next) => {
    const user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate,
        city: req.body.city,
        work: req.body.work,
        avatar: req.body.avatar ? req.body.avatar : '',
        cover: req.body.cover ? req.body.cover : '',
    }

    User.update(user, {
        where: {
            id: req.body.id
        }
    })
        .then(status => {
            if (status == 1) {
                return res.status(202).send({
                    message: "Updated successfully!",
                    user: user
                })
            } else {
                return res.status(400).send({
                    message: "Cannot update"
                })
            }
        })
        .catch(erro => {
            return res.status(500).send({
                message: "Internal error",
                error: erro
            })
        })
}

exports.profile = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.body.id
        },
        attributes: {
            exclude: ['password']
        }
    })

    const posts = await Post.findAll({
        where: {
            userId: req.body.id
        },
        include: ["user"]
    })

    const following = await Relation.findAll({
        where: {
            fromId: req.body.id
        },
        include: ["to"]
    })

    const followers = await Relation.findAll({
        where: {
            toId: req.body.id
        },
        include: ["from"]
    })

    return res.status(200).send({
        message: "Here you have your user!",
        user: user,
        posts: posts,
        following: following,
        followers: followers
    })
}