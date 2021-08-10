const db = require('../models')

const Relation = db.userRelations

exports.relation = (req, res) => {
    return res.status(200).send({
        message: "You reach the router to check the relation of the users"
    })
}