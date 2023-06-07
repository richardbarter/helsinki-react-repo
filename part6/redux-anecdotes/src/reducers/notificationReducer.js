import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action){
      console.log('notification set  state', JSON.parse(JSON.stringify(state)));
      console.log('notification set action', action);
      return action.payload
    },
    removeNotification(state, action){
      console.log('remove notification  state', JSON.parse(JSON.stringify(state)));
      console.log('remove notification action', action);
      return ''
    }
  }
})

export const { displayNotification, removeNotification } = notificationSlice.actions



export const setNotification = (content, time) => {
  const totalTime = time * 1000
  return async dispatch => {
    dispatch(displayNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, totalTime)
  }
}
export default notificationSlice.reducer