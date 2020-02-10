import React from 'react'
import PointOfInterest from '../PointOfInterest'

/**
 * pointOfInterestList - creates a list of PointOfInterest.
 *                       components to be displayed on a map.
 * @param {Array<any>} - poi data array from database.
 * @return {Array<any>} - a data array with React location components.
 */
const makePointOfInterestList = (poiCoordinates) => {
  const locationList = poiCoordinates.map(location => (
    <PointOfInterest
      key={ location.poi_id }
      lat={ location.lat }
      lng={ location.lon }
      text={ location.name }
    />
  ))

  return locationList
}

export default makePointOfInterestList
