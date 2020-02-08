import React from 'react';
import PointOfInterest from './PointOfInterest';

/**
 * pointOfInterestList - creates a list of PointOfInterest
 *                       components to be displayed on a map
 * @param {array} - poi data array from database
 * @return {array} - a data array with location objects
 */
function makePointOfInterestList(poiCoordinates) {

  let locationList = poiCoordinates.map(location => (
     <PointOfInterest
        key={location.poi_id}
        lat={location.lat}
        lng={location.lon}
        text={location.name}
    />
  ))

  return locationList;
}
export default makePointOfInterestList;
