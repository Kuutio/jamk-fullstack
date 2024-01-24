// start nodemon because automatic restart and startup in changes. QOL
//express package
const { error } = require('console')
const express = require('express')
//create express app 
const app = express()

//parses json and requests
app.use(express.json())
//define port for communication
const port = 3000

//MONGOOSE
const mongoose = require("mongoose")

//connectionstring
const mongoDB = "mongodb+srv://astraali:smurffit151996@astraali.ixlugau.mongodb.net/?retryWrites=true&w=majority"
console.log("wtf")
//connect mongodb
//mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(mongoDB)
const db = mongoose.connection


// check connection - ok or error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
})

//schema
const userSchema = new mongoose.Schema({
  name: String
})

//reference schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  email: String
})

//model
const User = mongoose.model('User', userSchema, 'users')

//path and fs
const logPath = `./logfile.txt`
const fs = require('fs')
//const path = require('path')


const logData = (request,response, next) => {
  console.log("here")
  const date = new Date()
  const lDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  const log = `${lDate}: ${request.method} ${request.url}\n`
  //console.log(log)
  fs.appendFile(logPath,log, (error) => {
    if (error){
      console.log(error)
    }else{
      console.log("Log mark!")
    }
  })



  next()
}

app.use(logData)

//Barebones all deleted when server restarts normally you connect to database
//let users = 
//[
//  { 'id':'1', 'name':'Kirsi Kernel' },
//  { 'id':'2', 'name':'Matti Mainio' }
//]

// get all users
app.get('/users', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// get one user
// get one user
app.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) response.json(user)
  else response.status(404).end()
})

// create a new user
app.post('/users', async (request, response) => {
  // Get name from request
  const { name } = request.body

  // Create a new user
  const user = new User({
    name: name
  })

  // Save to db and send back to caller
  const savedUser = await user.save()
  response.json(savedUser)  
})

// delete one user
// delete one user
app.delete('/users/:id', async (request, response) => {
  const deletedUser = await User.findByIdAndRemove(request.params.id)
  if (deletedUser) response.json(deletedUser)
  else response.status(404).end()
})

app.put('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    // const name = request.query.name
    const { name } = request.query
    const user = users.find(user => user.id === id)
    if (user) {
      user.name = name
      response.status(200).end()
    } else {
      response.status(204).end()
    }
})

//start web server and listen $port
app.listen(port, () => {
  console.log('Example app listening on port 3000')
  console.log("wirjs")
})