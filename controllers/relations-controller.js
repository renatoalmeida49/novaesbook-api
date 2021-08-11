const db = require('../models')

const Relation = db.userRelations

function isFollowing(req, idUser) {
    return new Promise((resolve, reject) => {
        Relation.findOne({
            where: {
                fromId: req.user.id,
                toId: idUser
            }
        })
            .then(user => {
                if (user) {
                    return resolve(true)
                }

                return resolve(false)
            })
    })
} 

exports.relation = async (req, res) => {
    const flag = await isFollowing(req, req.body.user_to)

    return res.status(200).send({
        message: "You got this",
        flag: flag
    })
}

exports.updateRelation = async (req, res) => {
    const flag = await isFollowing(req, req.body.user_to)

    if (flag) {
        // Unfollow the user
        Relation.findOne({
            where: {
                fromId: req.user.id,
                toId: req.body.user_to
            }
        })
            .then(result => {
                result.destroy()

                return res.status(201).send({
                    message: "You have unfollowed it!"
                })
            })
            .catch(err => {
                return res.status(500).send({
                    message: "Something went wrong.",
                    erro: err
                })
            })

    } else {
        // Follow the user
        const relation = {
            fromId: req.user.id,
            toId: req.body.user_to
        }

        Relation.create(relation)
            .then(data => {
                return res.status(201).send({
                    message: "You are following it!",
                    relation: data
                })
            })
            .catch(err => {
                return res.status(500).send({
                    message: "Something went wrong.",
                    erro: err
                })
            })
    }
}