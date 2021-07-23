const db = require('../models')

const Post = db.posts

exports.create = (req, res) => {
    if (!req.body.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const post = {
        id_user: req.user.id,
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