/* eslint-env jest */
// Need to turn off check for unused vars here since React is required in scope to use JSX
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it( 'renders without crashing', () => {
  const div = document.createElement( 'div' )
  ReactDOM.render( <App />, div )
  ReactDOM.unmountComponentAtNode( div )
} )
