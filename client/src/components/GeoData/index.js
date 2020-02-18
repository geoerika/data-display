import React, { useState, useEffect } from 'react'
import axiosGet from '../shared/getData'
import { Container, Row, Col } from 'react-bootstrap'
import MapButtons from './MapButtons'
import GeoDataTable from './GeoDataTable'
import DataMap from './DataMap'
import useHideAddData from '../../hooks/useHideAddData'
import Error from '../shared/Error'
import './MapButtons.scss'

/**
 * GeoData - functional React component which displays buttons, table, and map on a page.
 * @return {any} - React component.
 */
const GeoData = () => {
  const URL = process.env.REACT_APP_API_ENDPOINT

  const [state, setState] = useState({
    poi: [],
    dataArrived: false,
    errorMessage: ''
  })

  // fetch data
  useEffect(() => {
    Promise.resolve(
      axiosGet(`${URL}/poi`)
    ).then(response => {
      setState(prev => ({
        ...prev,
        poiData: response.data,
        dataArrived: true
      }))
    }).catch((error) => {
        setState((prev) => ({ ...prev, errorMessage: error.response.data }))
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(error.response.data)
      })
  }, [URL])

  // we set and retrieve updated values here
  const {
    showImpressions,
    showRevenue,
    showClicks,
    showEvents,
    selectDataOnMap
  } =
    useHideAddData({
      impressions: true,
      revenue: false,
      clicks: false,
      events: false
    })

  // constants used to show different data on the map.
  const SHOWIMPRESSIONS = 'showImpressions'
  const SHOWREVENUE = 'showRevenue'
  const SHOWCLICKS = 'showClicks'
  const SHOWEVENTS = 'showEvents'

  return (
    <Container size='xl'>
      { state.errorMessage &&
        <Error errorMessage= { state.errorMessage }/>
      }
      <Row>
      { state.dataArrived &&
        !state.errorMessage &&
        <Col lg={ 7 }>
          { showImpressions &&
            <DataMap poiData = { state.poiData} dataType={ 'impressions' }/> }
          { showRevenue &&
            <DataMap poiData = { state.poiData} dataType={ 'revenue' }/> }
          { showClicks&&
            <DataMap poiData = { state.poiData} dataType={ 'clicks' }/> }
          { showEvents &&
            <DataMap poiData = { state.poiData} dataType={ 'events' }/> }
        </Col>

      }
      { state.dataArrived &&
        !state.errorMessage &&
        <Col className='bttn-table' lg={ 5 }>
          <Row>
            <MapButtons
              onClickImpressions={ () => selectDataOnMap(SHOWIMPRESSIONS) }
              onClickRevenue={ () => selectDataOnMap(SHOWREVENUE) }
              onClickClicks={ () => selectDataOnMap(SHOWCLICKS) }
              onClickEvents={ () => selectDataOnMap(SHOWEVENTS) }
            />
          </Row>
          <Row>
              <GeoDataTable poiData={ state.poiData }/>
          </Row>
        </Col>
      }
      </Row>
    </Container>
  )
}

export default GeoData
