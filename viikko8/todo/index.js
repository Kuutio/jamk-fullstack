const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000

// cors - allow connection from different domains and ports
app.use(cors())

// convert json string to json object (from request)
app.use(express.json())

const mongoose = require('mongoose')
const mongoDB = "mongodb+srv://astraali:smurffit151996@astraali.ixlugau.mongodb.net/?retryWrites=true&w=majority"
console.log("wtf")
mongoose.connect(mongoDB)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connectfed")
})

// scheema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true } 
})

// model
const Todo = mongoose.model('Todo', todoSchema, 'todos')

app.post('/todos', async (request, response) => {
  console.log("try")
  const { text } = request.body
  const todo = new Todo({
    text: text
  })
  const savedTodo = await todo.save()
  response.json(savedTodo)  
})

// todos-route
app.get('/todos', async (request, response) => {
  const users = await Todo.find({})
  response.json(users)
})

app.get('/todos/:id', async (request, response) => {
  const todo = await Todo.findById(request.params.id)
  if (todo) response.json(todo)
  else response.status(404).end()
})

app.delete('/todos/:id', async (request, response) => {
  const doc = await Todo.findById(request.params.id);
  if (doc) {
    await doc.deleteOne()
    response.json(doc)
  }
  else response.status(404).end()
})

function init() {
  let infoText = document.getElementById('infoText')
  infoText.innerHTML = 'Ladataan tehtävälista palvelimelta, odota...'
  loadTodos()
}

async function loadTodos() {
  let response = await fetch('http://localhost:3000/todos')
  let todos = await response.json()
  console.log(todos)
  showTodos(todos)
}

function createTodoListItem(todo) {
  // luodaan uusi LI-elementti
  let li = document.createElement('li')
    // luodaan uusi id-attribuutti
  let li_attr = document.createAttribute('id')
    // kiinnitetään tehtävän/todon id:n arvo luotuun attribuuttiin 
  li_attr.value= todo._id
    // kiinnitetään attribuutti LI-elementtiin
  li.setAttributeNode(li_attr)
    // luodaan uusi tekstisolmu, joka sisältää tehtävän/todon tekstin
  let text = document.createTextNode(todo.text)
    // lisätään teksti LI-elementtiin
  li.appendChild(text)
    // luodaan uusi SPAN-elementti, käytännössä x-kirjan, jotta tehtävä saadaan poistettua
  let span = document.createElement('span')
    // luodaan uusi class-attribuutti
  let span_attr = document.createAttribute('class')
    // kiinnitetään attribuuttiin delete-arvo, ts. class="delete", jotta saadaan tyylit tähän kiinni
  span_attr.value = 'delete'
    // kiinnitetään SPAN-elementtiin yo. attribuutti
  span.setAttributeNode(span_attr)
    // luodaan tekstisolmu arvolla x
  let x = document.createTextNode(' x ')
    // kiinnitetään x-tekstisolmu SPAN-elementtiin (näkyville)
  span.appendChild(x)
    // määritetään SPAN-elementin onclick-tapahtuma kutsumaan removeTodo-funkiota
  span.onclick = function() { removeTodo(todo._id) }
    // lisätään SPAN-elementti LI-elementtin
  li.appendChild(span)
    // palautetaan luotu LI-elementti
    // on siis muotoa: <li id="mongoIDXXXXX">Muista soittaa...<span class="remove">x</span></li>
  return li
}

function showTodos(todos) {
  let todosList = document.getElementById('todosList')
  let infoText = document.getElementById('infoText')
  // no todos
  if (todos.length === 0) {
    infoText.innerHTML = 'Ei tehtäviä'
  } else {    
    todos.forEach(todo => {
        let li = createTodoListItem(todo)        
        todosList.appendChild(li)
    })
    infoText.innerHTML = ''
  }
}

async function addTodo() {
  let newTodo = document.getElementById('newTodo')
  const data = { 'text': newTodo.value }
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  let todo = await response.json()
  let todosList = document.getElementById('todosList')
  let li = createTodoListItem(todo)
  todosList.appendChild(li)

  let infoText = document.getElementById('infoText')
  infoText.innerHTML = ''
  newTodo.value = ''
}

async function removeTodo(id) {
  const response = await fetch('http://localhost:3000/todos/'+id, {
    method: 'DELETE'
  })
  let responseJson = await response.json()
  let li = document.getElementById(id)
  li.parentNode.removeChild(li)

  let todosList = document.getElementById('todosList')
  if (!todosList.hasChildNodes()) {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ei tehtäviä'
  }
}

// app listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000')
})