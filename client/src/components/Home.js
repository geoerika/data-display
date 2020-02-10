import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './Home.css'

/**
 * Home - home component.
 * @return {any} - a React component.
 */
const Home = () => {
  return (
    <div>
      <h2 style={ { color: 'red' } }>Welcome to Erika's solutions</h2>
      <FontAwesomeIcon className='point-of-interest' icon='map-marker-alt' />
    </div>
  )
}

export default Home
