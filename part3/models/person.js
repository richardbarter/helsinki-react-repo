const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name:{
    type: String,
    minLength: 3,
    required: true
  },
  number:{
    type: String,
    minLength: 8,
    validate: {
      validator: function(str){
        if(!str.includes('-')){
          //checks to make sure str only contains digits.
          return /^\d+$/.test(str)
        }
        const str_arr = str.split('-')
        console.log('str arr is', str_arr)
        console.log('str length is', str_arr[0].length)
        if(str_arr[0].length < 2 || str_arr[0].length >3){
          return false
        }
        console.log('outcome of test check if str only contains digits', /^\d+$/.test(str_arr[0]))
        if(!(/^\d+$/.test(str_arr[0])) || !(/^\d+$/.test(str_arr[1]))){
          return false
        }

        return true
      },
      message: 'Incorrect number format.'
    }

  }

})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Person', personSchema)