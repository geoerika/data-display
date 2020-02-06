import React from 'react';
import { Nav } from 'react-bootstrap';

export default function Navigation() {

  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link href="/dailyData">DailyDataChart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/hourlyData">HourlyDataChart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
       <Nav.Link href="/hourlyData">GeoMapData</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
