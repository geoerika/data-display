import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Buttons from '../Buttons';
import GeoDataTable from './GeoDataTable';
import GeoMapData from './GeoMapData';
import useHideAddData from '../../hooks/useHideAddData';
import './index.css';

function GeoData(props) {

  const URL = process.env.REACT_APP_API_ENDPOINT;

  const [state, setState] = useState({
    poi: [],
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
      Promise.resolve(
        axiosGet(`${URL}/poi`)
      )
      .then(response => {
        console.log('response in index: ', response);
        setState(prev => ({
          ...state,
          poi: response.data,
          dataArrived: true
        }));
      });
  }, []);

console.log('state: ', state);

  // sets all variables to true to show initially all data on chart
  const { showImpressions,
          showRevenue,
          showClicks,
          showEvents,
          showDataTable,
          hideAddData } = useHideAddData('');

  // tell Buttons to show DataTable button
  let showDataTableButton = true;

  const SHOWIMPRESSIONS = 'showImpressions';
  const SHOWREVENUE = 'showRevenue';
  const SHOWCLICKS = 'showClicks';
  const SHOWEVENTS = 'showEvents';
  const SHOWDATATABLE = 'showDataTable';

  return (
    <Container>
        <Row className='bttn-table'>
          <Col>
            <Buttons
              showDataTableButton={showDataTableButton}
              onClickImpressions={ () => hideAddData(SHOWIMPRESSIONS) }
              onClickRevenue={ () => hideAddData(SHOWREVENUE) }
              onClickClicks={ () => hideAddData(SHOWCLICKS) }
              onClickEvents={ () => hideAddData(SHOWEVENTS)  }
              onClickTable={ () => hideAddData(SHOWDATATABLE)  }
            />
          </Col>
          <Col>
            { showDataTable &&
              <GeoDataTable/>
            }
          </Col>
        </Row>
        <Row>
          { state.dataArrived &&
            <GeoMapData poi={state.poi} />
          }
        </Row>
    </Container>
  )
}

export default GeoData;

