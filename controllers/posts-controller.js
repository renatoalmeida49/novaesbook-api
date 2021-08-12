const db = require('../models')
const { Op } = require('sequelize')

const Post = db.posts
const Relation = db.userRelations

exports.homePage = async (req, res) => {
    const ids = await Relation.findAll({
        where: {
            fromId : req.user.id
        },
        attributes: ['toId']
    })

    const array = ids.map(item => {
        return item.toId
    })

    array.push(req.user.id)

    const posts = await Post.findAll({
        where: {
            userId: {
                [Op.in]: array
            }
        },
        include: ['user']
    })

    return res.status(200).send({
        message: "I need to send the home page of the user.",
        ids: array,
        posts: posts
    })
}

exports.create = (req, res) => {
    if (!req.body.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const post = {
        userId: req.user.id,
        type: req.body.type,
        body: req.body.body
    }

    Post.create(post)
        .then(data => {
            return res.status(201).send({
                message: "Post added!",
                data: data
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Erro while creating post"
            })
        })
}

exports.userPosts = (req, res) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "You need to send me an ID"
        })
    }

    Post.findAll({
        where: {
            userId: req.body.userId
        },
        include: ["user"]
    })
        .then(posts => {
            return res.status(200).send({
                message: "There you have the posts of this user!",
                userId: req.body.userId,
                posts: posts
            })
        })
        .catch(erro => {
            return res.status(500).send({
                message: "Something went wrong getting the posts",
                erro: erro
            })
        })
}