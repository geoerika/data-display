import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Navigation() {

  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link href="/dailydata">DailyDataChart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/hourlydata">HourlyDataChart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
       <Nav.Link href="/geodata">GeoMapData</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
