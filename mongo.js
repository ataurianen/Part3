const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://Yedo:${password}@fullstack.7gh2xwq.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullStack`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', phonebookSchema);

const person = new Person({
  name,
  number,
});

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook:');
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(`Added ${name} Number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
