import { useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      dispatch(removeUser())
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (exception) {
      console.log('exception', exception)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default LogoutForm
