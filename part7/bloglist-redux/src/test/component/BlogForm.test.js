import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../../components/BlogForm.js'

test('<BlogForm /> calls event handler it received as props with correct details', async () => {
  //mock function jest.fn() -- mock funcitons are known as 'spies' becuase they let you spy on the behaviour of a function that is called indirectly by some other code, rather than testing onlyt he output
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)
  screen.debug(container)

  //tests get access to the input field using .getByRole. if there are more than one input fields, it will return an array of them. insteaed can add a placeholder to the input in the component, and then use getByPlaceholderText
  // const input = screen.getByRole('textbox').
  //most flexible way of finding elements in tests is the method querySelector of the container object, which is returned by render.
  const titleInput = container.querySelector('#blog-title-input')
  const authorInput = container.querySelector('#blog-author-input')
  const urlInput = container.querySelector('#blog-url-input')
  const sendButton = screen.getByText('create')

  //method type of userEvent is used to write text to input field.
  await user.type(titleInput, 'testing title')
  await user.type(authorInput, 'testing author')
  await user.type(urlInput, 'testing url')
  await user.click(sendButton)

  //ensures submitting the form calls the addNewBlog.
  expect(createBlog.mock.calls).toHaveLength(1)
  //checks the event handler is called with the right parameters - that a blog with the correct content is created when the form is filled.
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
