import React from 'react';

/**
 * pointOfInterestList - creates a list of PointOfInterest
 *                       components to be displayed on a map
 * @param {array} - poi data array from database
 * @return {array} - a data array with location objects
 */
function PointData(props) {
  return(
    <div className="circle"
         style={{ height: props.value,
                  width: props.value,
                  backgroundColor:"#940031"
                }}
    />
  )
}
export default PointData;
