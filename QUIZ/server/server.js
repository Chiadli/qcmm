const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')
const dovenv = require('dotenv')
const server = http.createServer(app);


dovenv.config()
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_URI)
    .then((r) => {
        console.log("connected successfully")
        server.listen(process.env.PORT || 4000);
    }).catch((err) => {
        console.log(err)
    })