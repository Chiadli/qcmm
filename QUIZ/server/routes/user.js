const router = require('express').Router()
const { getUser, addUser, editUser, deleteUser } = require('../controllers/userController')



router.post('/login', getUser)
router.post('/register', addUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router