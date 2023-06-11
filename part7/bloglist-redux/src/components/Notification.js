import { useSelector } from 'react-redux'
const Notification = () => {
  const notificationData = useSelector((state) => {
    return state.notification
  })
  if (!notificationData) {
    return null
  }
  const message = notificationData.content
  const style = notificationData.errorType

  console.log('notification data is', notificationData)

  let className = 'error'
  if (style && style === 'success') {
    className = 'success'
  }

  return <div className={className}>{message}</div>
}

export default Notification
