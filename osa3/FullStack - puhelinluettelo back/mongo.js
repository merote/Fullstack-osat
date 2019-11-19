const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-bjwgz.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  number: { type: String}
})


const Person = mongoose.model('Person', personSchema)
personSchema.plugin(uniqueValidator)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  })
} else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
      result.forEach(person =>{
        console.log(person.name, person.number)
      })
    mongoose.connection.close();  
    })  
} else {
  console.log("Fail! Check inputs")
  process.exit(1)

}

//mongoose.connection.close();  



/*person.save().then(response => {
  console.log('person saved!');
  mongoose.connection.close();
})*/