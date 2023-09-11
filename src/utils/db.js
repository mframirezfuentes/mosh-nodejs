const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
name: String,
password: String
})

const User= mongoose.model('User', userSchema)
const user= new User({name:"Fer",password:"1234"})
