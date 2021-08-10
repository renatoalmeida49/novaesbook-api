const db = require('../models')

const Relation = db.userRelations

exports.relation = (req, res) => {
    Relation.findOne({
        where: {
            fromId: req.body.user_from,
            ToId: req.body.user_to
        }
    })
        .then(user => {
            return res.status(200).send({
                message: "You got this",
                user: user
            })
        })
        .catch(err => {
            return res.status(200).send({
                message: "Erro",
                erro: err
            })
        })
}