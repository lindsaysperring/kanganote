const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')

app.use(cors())

let notes = [
    {
        "id": 0,
	"note": "shopping list\nbutter\nmilk\nbread",
    },
    {
        "id": 1,
	"note": "this is a note",
    },
    {
        "id": 2,
	"note": "this is another note",
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Notes API</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

const generateAuthID = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.authorid))
        : 0
    return maxId + 1
}
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})