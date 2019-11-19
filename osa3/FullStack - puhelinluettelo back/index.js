require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('content', (request, response) => {
    console.log(request.method)
    let content_string = ""
    if (request.method === "POST") {
      content_string = JSON.stringify(request.body)
    }
    return content_string
})

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
//app.use(logger)
app.use(morgan(':method :url :status :res[content-length]'
  + ' - :response-time ms :content'))

/*let persons = [
    { 
      "name": "Kalle Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mari Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]*/


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
  response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const persons_amount = Person.length
  Person.find({}).then(persons => {
    console.log(new Date().getTime())
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
                  <p>${new Date()}</p>`)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  
  /*const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }*/
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
  /*const id = Number(request.params.id)
  Person.find({}).then(persons => {
    persons = persons.filter(p => p.id !== id)
    response.json(persons.toJSON())
    response.status(204).end()
    })*/
  /*persons = persons.filter(p => p.id !== id)
  response.json(persons)
  response.status(204).end()*/
})

app.post('/api/persons', (request, response, next) => { 

  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
  /*const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  } else if (persons.find(p => p.name === body.name) !== undefined ) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const id_new = Math.floor(Math.random() * Math.floor(1000000))
  const person = new Person({
    name: body.name,
    number: body.number,
    id: id_new,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })*/
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
