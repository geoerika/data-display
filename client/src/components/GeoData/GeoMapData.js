import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import makePointOfInterestList from './helpers/makePointOfInterestList';
import makePointDataList from './helpers/makePointDataList';

function GeoMapData(props) {

  const GMAPAPIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const [state, setState] = useState({
    center: {
      lat: 44.1906342,
      lng: -102.4960887
    },
    zoom: 4,
    poi: props.poi
  });

console.log('state: ', state);

  let locationList = makePointOfInterestList(state.poi);
  let pointEventsList = makePointDataList(state.poi, "events");
  let pointImpressionsList = makePointDataList(state.poi, "impressions");
  let pointRevenueList = makePointDataList(state.poi, "revenue");
  let pointClicksList = makePointDataList(state.poi, "clicks");

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPAPIKEY }}
        defaultCenter={state.center}
        defaultZoom={state.zoom}
      >

      { pointClicksList }

      </GoogleMapReact>
    </div>
  );

}

export default GeoMapData;
