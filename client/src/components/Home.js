import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Home - home component.
 * @return {any} - a React component.
 */
const Home = () => {
  return (
    <div>
      <h1 style={ { color: 'red', marginTop: '20vh'} }>Data Display React</h1>
      <br/>
      <div>
        <FontAwesomeIcon className='chart-bar' icon='chart-bar' size='3x' style={{ 'marginRight': '10px'}} />
        <FontAwesomeIcon className='chart-area' icon='chart-area' size='3x' style={{ 'marginRight': '10px'}}/>
        <FontAwesomeIcon className='globe-americas' icon='globe-americas' size='3x' />
      </div>
      <br/>
      <h3>Simple application to display data in React using charts, tables, and map.</h3>
    </div>
  )
}

export default Home
