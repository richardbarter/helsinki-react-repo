import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      console.log('add like state', JSON.parse(JSON.stringify(state)))
      console.log('add like aciton', action)
      const changedBlog = action.payload
      const newState = state.map((blog) =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
      newState.sort((a, b) => b.likes - a.likes)
      return newState
    },
    setBlogs(state, action) {
      console.log('set blogs state', JSON.parse(JSON.stringify(state)))
      console.log('set blogs aciton', action)
      return action.payload
    },
    deleteObject(state, action) {
      const newState = state.filter((b) => b.id !== action.payload)
      return newState
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll()
    console.log('initialie blogs get all is', allBlogs)
    dispatch(setBlogs(allBlogs))
  }
}
export const addLike = (blogObject) => {
  console.log('add like blog object is', blogObject)
  const id = blogObject.id
  const blog = { ...blogObject, likes: blogObject.likes + 1 }
  return async (dispatch) => {
    const changedBlog = await blogService.update(id, blog)
    console.log('returned changed blog is', changedBlog)
    dispatch(like(changedBlog))
  }
}

export const deleteBlog = (id) => {
  console.log('reducer delete, blog id is', id)
  return async (dispatch) => {
    const response = await blogService.deleteBlog(id)
    dispatch(deleteObject(id))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blogObject)
    dispatch(appendBlog(addedBlog))
  }
}

export const { like, setBlogs, deleteObject, appendBlog } = blogSlice.actions

export default blogSlice.reducer
