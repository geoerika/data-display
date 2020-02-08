import React from 'react';
import PointData from '../PointData';

/**
 * pointOfInterestList - creates a list of PointOfInterest
 *                       components to be displayed on a map
 * @param {array} - poi data array from database
 * @return {array} - a data array with location objects
 */
function makePointDataList(geoData, dataType) {
  let scale = 0;

  switch(dataType) {
  case "events":
    scale=40000;
    break;
  case "impressions":
    scale=700000000;
    break;
  case "revenue":
    scale=2000000;
    break;
  case "clicks":
    scale=500000;
    break;
}

  let pointDataList = geoData.map(location => (
    <PointData
      key={ location.poi_id }
      value={ Number(location[dataType] / scale) }
      lat={ location.lat }
      lng={ location.lon }
      text={ location.name }/>
  ));

  console.log('pointDataList: ', pointDataList);

  return pointDataList;
}
export default makePointDataList;
