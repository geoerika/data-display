import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import PointOfInterest from './PointOfInterest';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
// <AnyReactComponent
        //   lat={59.955413}
        //   lng={30.337844}
        //   text="My Marker"
        // />

function GeoMapData() {

  URL = process.env.REACT_APP_API_ENDPOINT;
  const GMAPAPIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  console.log('GMAPAPIKEY:',  GMAPAPIKEY);

  const [state, setState] = useState({
    center: {
      lat: 44.1906342,
      lng: -102.4960887
    },
    zoom: 4,
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
    Promise.all([
      Promise.resolve(
        axiosGet(`${URL}/poi`)
      )
      // ,
      // Promise.resolve(
      //   axiosGet('http://localhost:5555/stats/hourly')
      // )
    ]).then((all) => {
        console.log('all in GEO: ', all);
        setState(prev => ({
          ...state,
          poi: all[0].data,
          // statsHourly: all[1].data,
          dataArrived: true
        }));
    });
  }, []);

console.log('state: ', state);

  let locationList = state.poi.map(location => (
        <PointOfInterest
          lat={ location.lat }
          lng={ location.lon }
        />
  ));


  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPAPIKEY }}
        defaultCenter={state.center}
        defaultZoom={state.zoom}
      >
      { locationList }
      </GoogleMapReact>
    </div>
  );

}

export default GeoMapData;
