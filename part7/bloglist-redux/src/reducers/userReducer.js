import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
    remove: (state) => {
      return null
    },
  },
})

export const { set, remove } = userSlice.actions

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(set(user))
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    dispatch(remove())
  }
}

export default userSlice.reducer
