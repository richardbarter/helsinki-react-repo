import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../components/Blog.js'

describe('Blog component testing', () => {

  let container
  const handleAddLike = jest.fn()
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'googleo.com',
      likes: 22
    }

    container = render(
      <Blog
        blog={blog}
        handleAddLike={handleAddLike}
        handleDeleteBlog={mockHandler}
      />
    ).container
  })


  test('renders blog title and author, but not url or likes', () => {

    //const { container } = render(<Blog blog={blog} />)
    //screen.debug()
    const authorTitle = container.querySelector('.blog-title-user')
    //screen.debug(authorTitle)
    expect(authorTitle).toHaveTextContent(
      'test blog test author'
    )

    const togglableContent = container.querySelector('.togglableContent')
    console.log('togglable')
    screen.debug(togglableContent)
    expect(togglableContent).toHaveStyle('display: none')

    //expect(authorTitle).toBeDefined()


  })

  test('URL and number of likes are shown when clicking the view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const togglableContent = container.querySelector('.togglableContent')
    expect(togglableContent).not.toHaveStyle('display: none')

  })

  test('when like button clicked twice, the event handler the component receives is called twice', async() => {

    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)
    expect(handleAddLike.mock.calls).toHaveLength(2)


  })
})