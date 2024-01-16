const Quiz = require('../models/quizModel');


const getQuizzes = async (req, res) => {

    if (req.query.type === 'Student') {
        Quiz.find({ studentsList: { student: req.query.name } }, { name: 1, _id: 1, startAt: 1, endAt: 1, attempts: 1, studentsList: { attempts: 1, student: 1 } })
            .exec()
            .then((response) => {

                const student = response?.map(element => element.studentsList)
                    .map(element => element
                        .map(element => element.student === req.query.name ? element : null)
                        .filter(element => element !== null));

                for (let index = 0; index < response.length; index++) {
                    response[index].studentsList = student[index]

                }
                res.json(response)
            })
            .catch((err) => {
                console.log(err)
                res.json(err)
            })
    }

    if (req.query.type === 'Professor') {
        Quiz.find({ createdBy: req.query.userId }, { createdBy: 0 })
            .exec()
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }
}

const getQuizQuestions = async (req, res) => {

    if (req.body.type === 'Student') {
        Quiz.find({ studentsList: { student: req.body.name }, _id: req.body.quizId }, { name: 1, questionsList: 1, _id: 1 })
            .exec()
            .then((response) => {
                console.log(response)
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }

}

const getQuiz = async (req, res) => {
    if (req.query.type === 'Professor') {
        Quiz.find({ createdBy: req.query.userId, _id: req.params?.id }, { createdBy: 0 })
            .exec()
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }
}

const addQuiz = async (req, res) => {

    if (req.body.type === 'Professor') {
        Quiz.create(req.body.quizInfo)
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }
    else {
        console.log(req.user.type)
        res.json({ message: "User not authorized" })
    }
}

const editQuiz = async (req, res) => {


    if (req.body.type === 'Professor') {
        const id = req.params.id
        Quiz
            .updateOne({ _id: id }, { $set: req.body.quizInfo })
            .exec()
            .then((response) => {
                console.log(response)
                res.satus(201).json(response)
            })
            .catch((err) => {
                res.json(err)
            })
    }
    else {
        res.json({ message: "User not authorized" })
    }

}

const deleteQuiz = async (req, res) => {

    if (req.body.type === 'Professor') {
        const id = req.params.id
        Quiz
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


module.exports = { getQuizzes, getQuizQuestions, getQuiz, addQuiz, editQuiz, deleteQuiz }