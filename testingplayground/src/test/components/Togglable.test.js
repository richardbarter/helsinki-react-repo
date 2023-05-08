import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from '../../components/Togglable.js'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    //renders the Togglable component and saves the field container of the return value.
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">
          togglable content
        </div>
      </Togglable>
    ).container
  })


  //verifies the Togglable component renders its child component
  test('render its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displyaed', () => {
    const div = container.querySelector('.togglableContent')
    //toHaveStyle - verifies that the child component of the Togglable component is not visible initially, by checking
    //that the style of the div element contains display none
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})