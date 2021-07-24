import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Connection from './db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import Bcrypt from 'bcryptjs'
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
router.post('/signup', async (request, response) => {
    try{
        const existsignup = await User.findOne({email: request.body.email})
        if(existsignup){
            response.send({message: 'Account already exists'})
        }
        request.body.password = Bcrypt.hashSync(request.body.password, 10)
        const user = request.body
        const newUser = new User(user)
        await newUser.save()
        response.send({message: 'You have successfully created an account'})
    } catch(error){
        console.log('Error 1: ', error.message)
    }
})
router.post('/login', async (request, response) => {
    try {
        const existlogin = await User.findOne({email: request.body.email})
        if(existlogin){
            const userPassword = existlogin.password
            const hash = Bcrypt.compareSync(request.body.password, userPassword)
            if(hash){
                response.send({message: `${request.body.email} has successfully logged in`})
            }else{
                response.send({message: 'You have entered the wrong password!'})
            }
        } else{
            response.send({message: 'This account does not exist in the database'})
        }
    } catch (error){
        console.log('Error 4: ', error.message)
    }
})
router.post('/display', async (request, response) => {
    try{
        const displayData = await User.find()
        response.send({message: displayData})
    }catch(error){
        console.log('Error 6: ', error.message)
    }
})
router.post('/delete', async (request, response) => {
    try{
        if(request.body._id != ""){
            const deleteData = await User.deleteOne({_id: request.body._id})
            if(deleteData){
                response.send({message: 'Account has successfully been deleted'})
            }else{
                response.send({message: 'Some error occurred while deleting the account'})
            }
        }else{
        }
    } catch(error){
        console.log('Error 7: ', error.message)
    }
})
router.post('/editemail', async (request, response) => {
    try{
        const editEmail = await User.updateOne({_id: request.body.id},{ email: request.body.newemail})
        if(editEmail){
            response.send({message: 'Email has successfully been updated'})
        }else{
            response.send({message: 'Some error occurred while updating Email'})
        }
    }catch(error){
       console.log('Error 8: ', error.message)
    }
})
router.post('/editpass', async (request, response) => {
    try{
        request.body.newpass = Bcrypt.hashSync(request.body.newpass, 10)
        const editPass = await User.updateOne({_id: request.body.id},{ password: request.body.newpass})
        if(editPass){
            response.send({message: 'Password has successfully been updated'})
        }else{
            response.send({message: 'Some error occurred while updating Password'})
        }
    }catch(error){
       console.log('Error 9: ', error.message)
    }
})
// To handle HTTP POST requests in Express.js, you need to install them middle ware module body-parser. body-parser extracts the entire body portion of an incoming request stream and exposes it on request.body.
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors()) //It allows you to make requests from one website to another website in the browser
app.use('/', router)
