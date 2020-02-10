import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import makePointOfInterestList from './helpers/makePointOfInterestList';
import makePointDataList from './helpers/makePointDataList';

/**
 * GeoMapData - functional React component which displays the map on the map page;
 * @param {Object} props - array of objects containing locations, their coordinates, and related data.
 * @return {Array<any>} - React component containing a map with locations and related data.
 */
const GeoDataMap = (props) => {
  console.log('props in GeoMapData: ', props);

  const GMAPAPIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const [state] = useState({
    //map default data
    center: {
      lat: 44.1906342,
      lng: -102.4960887
    },
    zoom: 4,
    poiData: props.poiData
  });

console.log('state: ', state);

  //create all various data lists
  let locationList = makePointOfInterestList(state.poiData);
  let pointEventsList = makePointDataList(state.poiData, "events");
  let pointImpressionsList = makePointDataList(state.poiData, "impressions");
  let pointRevenueList = makePointDataList(state.poiData, "revenue");
  let pointClicksList = makePointDataList(state.poiData, "clicks");

  return (

    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPAPIKEY }}
        defaultCenter={state.center}
        defaultZoom={state.zoom}
      >
      { props.showLocations && locationList }
      { props.showImpressions && pointImpressionsList }
      { props.showRevenue && pointRevenueList }
      { props.showClicks && pointClicksList }
      { props.showEvents && pointEventsList }
      </GoogleMapReact>
    </div>
  );

};

export default GeoDataMap;
