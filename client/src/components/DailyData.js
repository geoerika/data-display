import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import BarChart from './BarChart';
import DailyDataTable from './DailyDataTable';


function DailyData(props) {

  const [state, setState] = useState({
    eventsDaily: [],
    statsDaily: [],
    dataArrived: false
  });

  const axiosGet = (url) => {
    return axios
            .get(url)
            .catch((error) => {
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);
            })
  };


  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axiosGet('http://localhost:5555/events/daily')
      ),
      Promise.resolve(
        axiosGet('http://localhost:5555/stats/daily')
      )
    ]).then((all) => {
        console.log('all: ', all);
        setState(prev => ({
          eventsDaily: all[0].data,
          statsDaily: all[1].data,
          dataArrived: true
        }));
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={7}>
          {state.dataArrived && <BarChart
            eventsDaily={ state.eventsDaily }
            statsDaily={ state.statsDaily }
          />}
        </Col>
        <Col lg={5}>
          {state.dataArrived && <DailyDataTable
            eventsDaily={ state.eventsDaily }
            statsDaily={ state.statsDaily }
          />}
        </Col>
      </Row>
    </Container>
  )
}

export default DailyData;