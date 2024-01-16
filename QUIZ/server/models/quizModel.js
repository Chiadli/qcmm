const { Schema, model } = require('mongoose')
const { questionSchema } = require('./questionModel')

const quizSchema = Schema({
    name: {
        type: String,
        required: true
    },
    questionsList: {
        type: [questionSchema],
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    studentsList: {
        type: [{
            student: {
                type: String,
                required: true
            },
            attempts: {
                type: Number,
                default: 0,
                required: true,
            },
            _id: false
        }]

    },
    attempts: {
        type: Number,
        required: true,
        default: 2,
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Quiz = model("quiz", quizSchema);
module.exports = Quiz;