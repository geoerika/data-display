import React, { useState, useEffect } from 'react'
import axiosGet from '../shared/getData'
import { Container, Row, Col } from 'react-bootstrap'
import AreaChart from './AreaChart'
import HourlyDataTable from './HourlyDataTable'

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
    dataArrived: false
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
    })
  }, [URL])

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

export default HourlyData
