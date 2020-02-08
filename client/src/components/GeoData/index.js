import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Buttons from '../Buttons';
import GeoMapData from './GeoMapData';

function GeoData(props) {

  // URL = process.env.REACT_APP_API_ENDPOINT;
  // console.log('URL: ', URL);

  // const [state, setState] = useState({
  //   eventsDaily: [],
  //   statsDaily: [],
  //   dataArrived: false
  // });



  // const axiosGet = (url) => {
  //   return axios
  //           .get(url)
  //           .catch((error) => {
  //             console.log(error.response.status);
  //             console.log(error.response.headers);
  //             console.log(error.response.data);
  //           })
  // };

  // useEffect(() => {
  //   Promise.all([
  //     Promise.resolve(
  //       axiosGet(`${URL}/events/daily`)
  //     ),
  //     Promise.resolve(
  //       axiosGet(`${URL}/stats/daily`)
  //     )
  //   ]).then((all) => {
  //       console.log('all: ', all);
  //       setState(prev => ({
  //         eventsDaily: all[0].data,
  //         statsDaily: all[1].data,
  //         dataArrived: true
  //       }));
  //   });
  // }, []);

  return (
    <Container>
        <Row>
          <Col>
            <Buttons/>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <GeoMapData/>
        </Row>
    </Container>
  )
}

export default GeoData;

