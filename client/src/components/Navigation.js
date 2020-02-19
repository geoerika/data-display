import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
/**
 * Navigation - defines app routing.
 * @return {any} - a React component to help navigating the app.
 */
const Navigation = () => {

  return (
    <Navbar bg='dark' variant='dark' className='justify-content-between'>
      <Navbar.Brand>Data Display React</Navbar.Brand>
      <Nav>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/dailydata'>DailyDataChart</Nav.Link>
        <Nav.Link href='/hourlydata'>HourlyDataChart</Nav.Link>
        <Nav.Link href='/geodata'>GeoMapData</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation
