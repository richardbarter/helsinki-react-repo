import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//added 07/12/22
import axios from 'axios'



import App from './App'

//need this for browser to show list when going to url. 
//console.log('promise axios get persons')
//const promise = axios.get('http://localhost:3001/persons')
//console.log(promise)


ReactDOM.createRoot(document.getElementById('root')).render(<App />)
