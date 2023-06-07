import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {

  //onst content = useField('text')
  // const author = useField('text')
  // const info = useField('text')
  //const content = usefield('text')
  const { onReset: contentReset, ...content } = useField('text')
  const { onReset: infoReset, ...author } = useField('text')
  const { onReset: authorReset, ...info } = useField('text')


  //console.log('content is ', content);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    console.log('in handle submit', e);
    e.preventDefault()
    
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    contentReset()
    infoReset()
    authorReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* how do you pass all content props except one? */}
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => handleReset()}>reset</button>
      </form>
    </div>
  )

  // return (
  //   <div>
  //     <h2>create a new anecdote</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         content
  //         <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
  //       </div>
  //       <div>
  //         author
  //         <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
  //       </div>
  //       <div>
  //         url for more info
  //         <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
  //       </div>
  //       <button>create</button>
  //     </form>
  //   </div>
  // )

}

export default CreateNew