const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:music089@cluster0.asbvime.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
console.log('before find');





Note.find({}).then(result => {
  console.log('in note find results');
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log('connected')

//     const note = new Note({
//       content: 'Hello, I am a note.',
//       date: new Date(),
//       important: true,
//     })

//     return note.save()
//   })
//   .then(() => {
//     console.log('note saved!')
    
//     return mongoose.connection.close()
//   })
//   .catch((err) => console.log(err))