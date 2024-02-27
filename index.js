require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
morgan.token('body', (request, response) => JSON.stringify(request.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.static('dist'));

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/info', (request, response) => {
  Person.countDocuments().then((countDocuments) => {
    response.send(`<p>Phonebook has info for ${countDocuments} people</p>
    <br />
    ${new Date()}`);
  });
});

app.get('/api/persons/:id', (request, response) => {
  const person = Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = Person.findByIdAndDelete(request.params.id).then((person) => {
    response.status(204).end();
  });
});

app.post('/api/persons/', (request, response) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    response.json(person);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
