const router = require('express').Router()
const { getQuestions, addQuestion, editQuestion, deleteQuestion } = require('../controllers/questionController')
const { getQuizzes, getQuizQuestions, getQuiz, addQuiz, editQuiz, deleteQuiz } = require('../controllers/quizController')

//router.get('/')

router.get('/quiz', getQuizzes)
router.post('/quiz', addQuiz)
router.post('/quiz/questions', getQuizQuestions)
router.get('/quiz/:id', getQuiz)
router.put('/quiz/:id', editQuiz)
router.delete('/quiz/:id', deleteQuiz)

router.get('/question', getQuestions)
router.post('/question', addQuestion)
router.put('/question/:id', editQuestion)
router.delete('/question/:id', deleteQuestion)




module.exports = router;