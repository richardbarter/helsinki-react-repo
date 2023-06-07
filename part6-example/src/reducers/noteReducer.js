// this is how the reducer will look when combined. 
// const initialState = {
//   notes: [
//     { content: 'reducer defines how redux store works', important: true, id: 1},
//     { content: 'state of store can contain any data', important: false, id: 2}
//   ],
//   filter: 'ALL'
// }

import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

//createSlice function returns an object containg the reducer as well as the action creators defined by the reducers parameter. The reducer can be accessed by the noteSlice.reducer property, whereas the action creators by the noteSlice.actions property.

const noteSlice = createSlice({
  //name parameter defines the prefix which is used in the action's type value. so createNote action will have value of notes/createNote
  name: 'notes',
  initialState: [],
  reducers:{
    // createNote(state, action){
    //   state.push(action.payload)
    //   // const content = action.payload
    //   // //mutating the state is OK here as createSlice uses the Immer library. This makes it possible to mutate state argument inside the reducer. 
    //   // state.push({
    //   //   content,
    //   //   important: false,
    //   //   id: generateId(),
    //   // })
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      console.log('test');
      console.log('toggle importance of state is', JSON.parse(JSON.stringify(state)));
      return state.map(note => 
        note.id !== id ? note : changedNote
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})



const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))



//can produce the file's export like:
export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}
export default noteSlice.reducer


// export default noteReducer