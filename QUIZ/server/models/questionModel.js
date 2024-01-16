const { Schema, model } = require('mongoose')


const questionSchema = Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    answers: {
        type: [{ answer: { type: String, required: true }, correct: { type: Boolean, required: true }, _id: false }],
        required: true
    },
    cretedBy: {
        type: String,
    },
    category: {
        type: String
    }
})

const Question = model('question', questionSchema);

module.exports = { Question, questionSchema };