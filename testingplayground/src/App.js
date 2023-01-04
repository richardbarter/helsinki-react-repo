

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  //maybe try what is suggested here.  - https://stackoverflow.com/questions/44748073/npm5-package-lock-json-different-entries-on-different-machines
  //for development build not optimised. Seems like push from this laptop significantly changed the package-lock.json contents.
  //may need to delete them and then run npm install again, and then from other complete, delete those files, and then pull the new ones. 
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true) 

  //before using service was this way:
  //   const hook = () => {
  //     console.log('effect')
  //     axios
  //       .get('http://localhost:3001/notes')
  //       .then(response => {
  //         console.log('promise fulfilled')
  //         setNotes(response.data)
  //       })
  //   }
  //  useEffect(hook, [])

  //after using service:
  
  useEffect(() => {
    notesService
      .getAll()
      .then(initialNotes => {
        setNotes(InitialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      //id: notes.length + 1,
    }

    // axios
    // .post('http://localhost:3001/notes', noteObject)
    // .then(response => {
    //   console.log(response)
    //   setNotes(notes.concat(response.data))
    //   setNewNote('')
    //   console.log('after set notes');
    // }) 

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })


  

  }

  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  console.log('before render');
  console.log('notes are ', notesToShow);
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App 