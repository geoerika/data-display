import React from 'react'
import PointData from './PointData'

/**
 * SimpleMarker - passes on the PointData component a dataType and a value of data.
 * @param {String} dataType - string suggesting type of data we are to display.
 * @param {Number} value - value of data to be used to scale circle data on the map.
 * @return {any} - a React component representing a data point on the map.
 */
const SimpleMarker = ({ dataType, value }) => {
  return (
    <div>
      <PointData dataType={ dataType } value={ value }/>
    </div>
  )
}

export default SimpleMarker
