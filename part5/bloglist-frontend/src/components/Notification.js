const Notification = ({ message, style }) => {

  if(message === null){
    return null
  }
  let className = 'error'
  if(style === 'success'){
    className = 'success'
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification