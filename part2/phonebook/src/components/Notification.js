import { sortedLastIndex } from "lodash";

const Notification = ({message, style}) => {

  // const errorStyle = {
  //   color: 'green',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10

  // }

  if(message === null){
    return null
  }
  console.log('style is', style);
  let className = 'error'
  if(style === 'success'){
    console.log('in if success');
    className = 'success'
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification