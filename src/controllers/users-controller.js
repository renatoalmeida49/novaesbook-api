const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = db.users
const Post = db.posts
const Relation = db.userRelations

exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
        if (errBcrypt) {
            return res.status(500).send({
                error: errBcrypt
            })
        }

        const USER = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            birthdate: req.body.birthdate
        }

        User.create(USER)
            .then(data => {
                return res.status(201).send({
                    message: "User created",
                    user: {
                        name: data.name,
                        email: data.email
                    },
                })
            })
            .catch(err => {
                return res.status(500).send({
                    message: err
                })
            })
    })
}

exports.signIn = async (req, res) => {
    const USER = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (!USER) {
        return res.status(403).send({
            message: "User or password not found"
        })
    }

    bcrypt.compare(req.body.password, USER.password, (err, result) => {
        if (err) {
            return res.status(401).send({
                message: "Falha na autenticação",
                error: err
            })
        }

        if (result) {
            const TOKEN = jwt.sign(
                {
                    id: USER.id,
                    email: USER.email,
                    name: USER.name,
                    birthdate: USER.birthdate,
                    city: USER.city,
                    work: USER.work,
                    avatar: USER.avatar,
                    cover: USER.cover
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
            )

            return res.status(200).send({
                mensagem: "Autenticado com sucesso",
                user: {
                    id: USER.id,
                    email: USER.email,
                    name: USER.name,
                    birthdate: USER.birthdate || '',
                    city: USER.city || '',
                    work: USER.work || '',
                    avatar: USER.avatar || '',
                    cover: USER.cover || ''
                },
                token: TOKEN
            })
        }

        return res.status(403).send({
            message: "User or password not found",
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

exports.profile = async (req, res) => {
    const ID = req.body.id || req.user.id
    
    const USER = await User.findOne({
        where: {
            id: ID
        },
        attributes: {
            exclude: ['password']
        }
    })

    const POSTS = await Post.findAll({
        where: {
            userId: ID
        },
        include: ["user"]
    })

    const FOLLOWING = await Relation.findAll({
        where: {
            fromId: ID
        },
        include: ["to"]
    })

    const FOLLOWERS = await Relation.findAll({
        where: {
            toId: ID
        },
        include: ["from"]
    })

    return res.status(200).send({
        message: "Here you have your user!",
        user: USER,
        posts: POSTS,
        following: FOLLOWING,
        followers: FOLLOWERS
    })
}