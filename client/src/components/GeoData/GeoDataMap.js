import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import makePointOfInterestList from './helpers/makePointOfInterestList'
import makePointDataList from './helpers/makePointDataList'

/**
 * GeoMapData - functional React component which displays the map on the map page;
 * @param {Object} props - array of objects containing locations, their coordinates, and related data.
 * @return {Array<any>} - React component containing a map with locations and related data.
 */
const GeoDataMap = ({
  poiData,
  showImpressions,
  showRevenue,
  showClicks,
  showEvents,
  showLocations
}) => {
  const GMAPAPIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY

  const [state] = useState({
    // map default data
    center: {
      lat: 44.1906342,
      lng: -102.4960887
    },
    zoom: 4,
    poiData: poiData
  })

  // create all various data lists
  const locationList = makePointOfInterestList(state.poiData)
  const pointEventsList = makePointDataList(state.poiData, 'events')
  const pointImpressionsList = makePointDataList(state.poiData, 'impressions')
  const pointRevenueList = makePointDataList(state.poiData, 'revenue')
  const pointClicksList = makePointDataList(state.poiData, 'clicks')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPAPIKEY }}
        defaultCenter={state.center}
        defaultZoom={state.zoom}
      >
        { showLocations && locationList }
        { showImpressions && pointImpressionsList }
        { showRevenue && pointRevenueList }
        { showClicks && pointClicksList }
        { showEvents && pointEventsList }
      </GoogleMapReact>
    </div>
  )
}

export default GeoDataMap
