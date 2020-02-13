import React, { useState, useEffect } from 'react'
import axiosGet from '../shared/getData'
import { Container, Row, Col } from 'react-bootstrap'
import BarChart from './BarChart'
import DailyDataTable from './DailyDataTable'
import Error from '../shared/Error'

/**
 * DailyData - fetches daily data from database and returns a React component showing daily data.
 * @return {Promise<any>} - a React component which contains a chart, table and buttons.
 */
const DailyData = () => {
  const URL = process.env.REACT_APP_API_ENDPOINT

  const [state, setState] = useState({
    eventsDaily: [],
    statsDaily: [],
    dataArrived: false,
    errorMessage: ''
  })

  // hook to fetch data from database and set state.
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axiosGet(`${URL}/events/daily`)
      ),
      Promise.resolve(
        axiosGet(`${URL}/stats/daily`)
      )
    ])
      .then((all) => {
        console.log('all in DailyData: ', all);
        setState(prev => ({
          eventsDaily: all[0].data,
          statsDaily: all[1].data,
          dataArrived: true
        }))
      }).catch((error) => {
          setState((prev) => ({ ...prev, errorMessage: error.response.data }))
          console.log(error.response.status)
          console.log(error.response.headers)
          console.log(error.response.data)
        })
  }, [URL])
  return (
    <Container>
      { state.errorMessage &&
       <Error errorMessage= { state.errorMessage }/>
      }
      <Row>
        <Col lg={6}>
          { state.dataArrived &&
            !state.errorMessage &&
            <BarChart
              eventsDaily={ state.eventsDaily }
              statsDaily={ state.statsDaily }
            />
          }
        </Col>
        <Col lg={6}>
          { state.dataArrived &&
            !state.errorMessage &&
            <DailyDataTable
              eventsDaily={ state.eventsDaily }
              statsDaily={ state.statsDaily }
            />
          }
        </Col>
      </Row>
    </Container>
  )
}

export default DailyData
