import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login: (state, action) => {},
  },
})

export const loginUser = (content) => {
  return async (dispatch) => {
    dispatch(login(content))
  }
}

export const { login } = loginSlice.actions

export default loginSlice.reducer
