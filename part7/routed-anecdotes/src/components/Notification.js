const Notification = ({ notification }) => {
  
  if(notification === '') return
  
  return (
    <div>
      {notification}
    </div>
  )
}

export default Notification