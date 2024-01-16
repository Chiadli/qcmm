const { Question } = require('../models/questionModel');


const getQuestions = async (req, res) => {
    if (req.query.type === "Professor") {
        Question.find({ createdBy: req.query.userId })
            .exec()
            .then((response) => {
                console.log(req.query.userId, response)
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }

    else {
        res.json({ message: "User not authorized" })
    }
}

const addQuestion = async (req, res) => {

    if (req.body.type === 'Professor') {
        Question
            .create(req.body)
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }
    else {
        res.json({ message: "User not authorized" })
    }

}

const editQuestion = async (req, res) => {
    const id = req.params.id

    if (req.body.type === 'Professor') {
        Question
            .updateOne({ _id: id }, { $set: req.body.question })
            .exec()
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }
    else {
        res.json({ message: "User not authorized" })
    }
}

const deleteQuestion = async (req, res) => {
    const id = req.params.id
    if (req.body.type === 'Professor') {
        Question
            .findOneAndDelete({ _id: id })
            .exec()
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }

    else {
        res.json({ message: "User not authorized" })
    }
}


module.exports = { getQuestions, addQuestion, editQuestion, deleteQuestion }