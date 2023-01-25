// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }
// const password = process.argv[2]
// const url = `mongodb+srv://fullstack:${password}@cluster0.asbvime.mongodb.net/phonebook?retryWrites=true&w=majority`

// mongoose.connect(url)

// const phonebookSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// })

// const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// if (process.argv.length < 4){
//   console.log('phonebook:');
//   Phonebook
//     .find({})
//     .then(result => {
//       result.forEach(phonebook => {
//         console.log(`${phonebook.name} ${phonebook.number}`);
//       })
//       mongoose.connection.close()
//     })
// }else{

//   const phonebook = new Phonebook({
//     name: process.argv[3],
//     number: process.argv[4],
//   })

//   phonebook.save().then(result => {

//     console.log(`added ${result.name} number ${result.number} to phonebook`);
//     mongoose.connection.close()
//   })
// }