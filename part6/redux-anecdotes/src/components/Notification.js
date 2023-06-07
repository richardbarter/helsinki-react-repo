import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => {
    console.log('notificaiton selector state is ', state);
    return state.notification
  })
  console.log('notification is', notification);
  //if notification != '' then show it, otherwise display: none?
  const displayNotification = notification === ''
  ? 'none'
  : ''

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: displayNotification
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification