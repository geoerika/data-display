import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import AreaChart from './AreaChart';
import HourlyDataTable from './HourlyDataTable';

function HourlyData(props) {

  URL = process.env.REACT_APP_API_ENDPOINT;
  console.log('URL: ', URL);

  const [state, setState] = useState({
    eventsHourlyly: [],
    statsHourly: [],
    dataArrived: false
  });

  function axiosGet (url) {
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
        axiosGet(`${URL}/events/hourly`)
      ),
      Promise.resolve(
        axiosGet(`${URL}/stats/hourly`)
      )
    ]).then((all) => {
        console.log('all in HourlyData: ', all);
        setState(prev => ({
          eventsHourly: all[0].data,
          statsHourly: all[1].data,
          dataArrived: true
        }));
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={6}>
          { state.dataArrived &&
            <AreaChart
              eventsHourly={ state.eventsHourly }
              statsHourly={ state.statsHourly }
            />
          }
        </Col>
        <Col lg={6}>
          { state.dataArrived &&
            <HourlyDataTable
              eventsHourly={ state.eventsHourly }
              statsHourly={ state.statsHourly }
            />
          }
        </Col>
      </Row>
    </Container>
  )
}

export default HourlyData;
