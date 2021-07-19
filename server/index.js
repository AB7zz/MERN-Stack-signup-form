import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Connection from './db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
const PORT = 9000
dotenv.config()
const app = express() //let's you structure a web application to handle multiple different http requests at a specific url, i.e http://localhost:8000
const username = process.env.AB7_USERNAME
const password = process.env.AB7_PASSWORD
Connection(username, password)
app.listen(PORT, () => console.log(`Server is successfully running on PORT ${PORT}`))

const router = express.Router()
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})
const User = mongoose.model('testusers', userSchema)
const insertData  = async (request, response) => {
    try{
        const user = request.body
        const newUser = new User(user)
        await newUser.save()
        response.status(200).json('User has successfully registered')
    } catch(error){
        console.log('Error 1: ', error.message)
    }
    return "hello"
}
router.post('/signup', insertData)


// To handle HTTP POST requests in Express.js, you need to install them middle ware module body-parser. body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors()) //It allows you to make requests from one website to another website in the browser
app.use('/', router)

