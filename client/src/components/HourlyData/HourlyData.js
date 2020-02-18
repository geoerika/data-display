import React, { useState, useEffect } from 'react'
import axiosGet from '../shared/getData'
import { Container, Row, Col } from 'react-bootstrap'
import AreaChart from './AreaChart'
import HourlyDataTable from './HourlyDataTable'
import Error from '../shared/Error'

/**
 * HourlyData - fetches hourly data from database and
 *              returns a React component displaying hourly data.
 * @return {Promise<any>} - a React component whcih contains a chart, table, and buttons.
 */
const HourlyData = () => {
  const URL = process.env.REACT_APP_API_ENDPOINT

  const [state, setState] = useState({
    eventsHourly: [],
    statsHourly: [],
    dataArrived: false,
    errorMessage: ''
  })

  // hook to fetch data from database and set state.
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axiosGet(`${URL}/events/hourly`)
      ),
      Promise.resolve(
        axiosGet(`${URL}/stats/hourly`)
      )
    ]).then((all) => {
      setState(prev => ({
        eventsHourly: all[0].data,
        statsHourly: all[1].data,
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
            <AreaChart
              eventsHourly={ state.eventsHourly }
              statsHourly={ state.statsHourly }
            />
          }
        </Col>
        <Col lg={6}>
          { state.dataArrived &&
            !state.errorMessage &&
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

export default HourlyData
