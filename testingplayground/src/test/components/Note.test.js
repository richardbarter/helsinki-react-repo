import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../../components/Note.js'

//userEvent makes simulating user input easier

//verifies the component renders the contents of the note
test('renders content', () => {
  //configure note
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  //render the component using the render function provided by react-testing-library
  render(<Note note={note} />)

  //Object screen has method debug - can be used to print the HTML of a component to the terminal.
  screen.debug()

  //screen - object that allows us to access the rendered component.
  //getByText to search for an element that has the note content and ensure that it exists.
  const element = screen.getByText('Component testing is done with react-testing-library')

  //can also use debug to print a wanted element to console:
  screen.debug(element)

  expect(element).toBeDefined()
})

test('renders content container version', () => {
  //configure note
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  //The containing DOM node of your rendered React Element. can call container.querySelector etc. to inspect children.
  const { container } = render(<Note note={note} />)

  //uses CSS-selector to find rendered elements using the method querySelector of the objectcontainer that is one of the fields returned by the render
  //getByTestID to get by the id field
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

})

test('clicking the button calls event handler once', async() => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  //the event handler is a mock function defined with jest. Mock functions allow you to test the links between code by erasing hte actual impoelmentation of a function
  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  //a session is started to interact with the rendered component
  const user = userEvent.setup()
  //the test finds the button based on the text from teh rendered component and clicks the element
  const button = screen.getByText('make not important')
  //clicking happens with the .click method of the userEvent-library
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})