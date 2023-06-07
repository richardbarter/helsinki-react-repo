// const filterReducer = (state = '', action) => {
//   switch(action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = filter => {
//   return{
//     type: 'SET_FILTER',
//     payload: filter,
//   }
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action){
      console.log('in filter chnage aciton thing');
      return action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer