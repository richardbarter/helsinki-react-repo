import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    //const input = event.target.value
    console.log('handle change event is ', event.target.value);
    dispatch(filterChange(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter