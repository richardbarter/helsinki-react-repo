import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set: (state, action) => {
      console.log('notification set  state', JSON.parse(JSON.stringify(state)))
      console.log('notification set action', action)
      return action.payload
    },
    clear(state, action) {
      return null
    },
  },
})

export const setNotification = (content, seconds, errorType) => {
  return async (dispatch) => {
    const data = { content: content, errorType: errorType }
    dispatch(set(data))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { set, clear } = notificationSlice.actions

export default notificationSlice.reducer
