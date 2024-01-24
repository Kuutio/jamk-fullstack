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
let users = 
[
  { 'id':'1', 'name':'Kirsi Kernel' },
  { 'id':'2', 'name':'Matti Mainio' }
]

// get all users
app.get('/users', (request, response) => {
    //app.use(logData)
    response.json(users)
  })

// get one user
app.get('/users/:id', (request, response) => {
    //const id = request.params.id // note how you can do this in different ways!
    const { id } = request.params
    console.log("here2")
    const user = users.find(user => user.id === id)
    //app.use(logData)
    if (user) response.json(user)
    else response.status(404).end()
    //app.use(logData)
})

// create a new user
app.post('/users/', (request, response) => {
    const maxId = Math.max(...users.map(user => user.id), 0)
    const user = request.body
    user.id = (maxId+1).toString() 
    users = users.concat(user) 
    //app.use(logData)
    response.json(user)
})

// delete one user
app.delete('/users/:id', (request, response) => {
    //const id = request.params.id
    const { id } = request.params
    users = users.filter(user => user.id !== id)
    // Just send "204 no content" status code back
    response.status(204).end()
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
})