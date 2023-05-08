import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from '../../components/NoteForm.js'

test('<NoteForm /> updates parent state and calls onSubmit', async() => {
  //mock function jest.fn() -- mock funcitons are known as 'spies' becuase they let you spy on the behaviour of a function that is called indirectly by some other code, rather than testing onlyt he output
  const createNote = jest.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  //tests get access to the input field using .getByRole. if there are more than one input fields, it will return an array of them. insteaed can add a placeholder to the input in the component, and then use getByPlaceholderText
  // const input = screen.getByRole('textbox').
  //most flexible way of finding elements in tests is the method querySelector of the container object, which is returned by render. Any CSS selector can be used with this method for searching elements in tests. If we add an id to the input = note-input, we can now find it with const { conatiner } = render(<NoteForm createNote={createNote} />) conatiner.querySelector('#note-input')
  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  //method type of userEvent is used to write text to input field.
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  //ensures submitting the form calls the createNoteMethod.
  expect(createNote.mock.calls).toHaveLength(1)
  //checks the event handler is called with the right parameters - that a note with the correct content is created when the form is filled.
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})