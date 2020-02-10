import React from 'react'
import { Nav } from 'react-bootstrap'

/**
 * Navigation - defines app routing.
 * @return {any} - a React component to help navigating the app.
 */
const Navigation = () => {

  return (
    <Nav variant='tabs'>
    <Nav.Item>
        <Nav.Link href='/home'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/dailydata'>DailyDataChart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/hourlydata'>HourlyDataChart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/geodata'>GeoMapData</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navigation
