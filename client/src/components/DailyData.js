import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BarChart from './BarChart';
import DataTable from './DataTable';


function DailyData(props) {

  return (
    <Container>
      <Row>
        <Col>
          <BarChart
            eventsDaily={ props.eventsDaily }
            statsDaily={ props.statsDaily }
          />
        </Col>
        <Col>
          <DataTable/>
        </Col>
      </Row>
    </Container>
  )
}

export default DailyData;