import { useSelector } from 'react-redux'
const Notification = () => {
  const notificationData = useSelector((state) => {
    console.log('noti selector state is', state)
    return state.notification
  })
  if (!notificationData) {
    return null
  }
  const message = notificationData.content

  console.log('notification data is', notificationData)

  const style = notificationData.errorType
  let className = 'error'
  if (style === 'success') {
    className = 'success'
  }

  return <div className={className}>{message}</div>
}

export default Notification
