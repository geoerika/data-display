import React, { useState, useEffect } from 'react';
import axiosGet from '../shared/getData';
import { Container, Row, Col } from 'react-bootstrap';
import BarChart from './BarChart';
import DailyDataTable from './DailyDataTable';

/**
 * DailyData - fetches daily data from database and returns a React component showing daily data.
 * @return {Promise<any>} - a React component which contains a chart, table and buttons.
 */
const DailyData = () => {

  URL = process.env.REACT_APP_API_ENDPOINT;

  const [state, setState] = useState({
    eventsDaily: [],
    statsDaily: [],
    dataArrived: false
  });

  console.log('state in daily Data: ', state);

  //hook to fetch data from database and set state.
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axiosGet(`${URL}/events/daily`)
      ),
      Promise.resolve(
        axiosGet(`${URL}/stats/daily`)
      )
    ]).then((all) => {
        setState(prev => ({
          eventsDaily: all[0].data,
          statsDaily: all[1].data,
          dataArrived: true
        }));
    });
  }, []);

  console.log('state in daily Data: ', state);

  return (
    <Container>
      <Row>
        <Col lg={6}>
          { state.dataArrived &&
            <BarChart
              eventsDaily={ state.eventsDaily }
              statsDaily={ state.statsDaily }
            />
          }
        </Col>
        <Col lg={6}>
          { state.dataArrived &&
            <DailyDataTable
              eventsDaily={ state.eventsDaily }
              statsDaily={ state.statsDaily }
            />
          }
        </Col>
      </Row>
    </Container>
  )
};

export default DailyData;