const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const getUser = async (req, res) => {

    const { email, password } = req.body;
    User
        .findOne({ email: email })
        .exec()
        .then((response) => {

            if (response !== null) {

                bcrypt.compare(password, response.password)
                    .then((result) => {
                        if (result) {
                            res.json({
                                userId: response._id,
                                name: response.name,
                                email: response.email,
                                type: response.type
                            })
                        }
                        else {
                            res.status(400).json({ message: "password incorrect" })
                        }
                    })
            }
            else {
                res.status(400).json({ message: " email incorrect" })
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err + "something went wrong" })
        })
}

const addUser = async (req, res) => {
    const { name, email, password, type } = req.body;

    User.findOne({ email: email })
        .exec()
        .then((response) => {
            if (response === null) {
                //hash password 
                bcrypt.genSalt(11)
                    .then((salt) => {
                        bcrypt.hash(password, salt)
                            .then((hash) => {
                                User
                                    .create({ name, email, password: hash, type })
                                    .then((response) => {

                                        res.json({ message: "regitred" })
                                    })
                            })

                    })
            }
            else {
                res.status(400).json({ message: 'User already exists' })
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err })
        })
}

const editUser = async (req, res) => {
    const id = req.params.id
    User
        .updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then((response) => {
            res.json({ message: "updated" })
        })
        .catch((err) => {

            res.status(500).json({ message: err })
        })

}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    User
        .findByIdAndDelete({ _id: id })
        .exec()
        .then((response) => {
            res.json({ message: "deleted " })
        })
        .catch((err) => {
            res.status(500).json({ message: err })
        })
}





module.exports = { getUser, addUser, editUser, deleteUser }