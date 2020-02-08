import React from 'react';

/**
 * pointOfInterestList - creates a list of PointOfInterest
 *                       components to be displayed on a map
 * @param {array} - poi data array from database
 * @return {array} - a data array with location objects
 */
function PointData(props) {
  let pointData = (
    <div className="circle"
         style={{ height: props.value,
                  width: props.value,
                  borderRadius: "50%",
                  borderColor: "magenta",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  backgroundColor:"#940031",
                  opacity: 0.5
                }}
    />
  )
  console.log('PointData: ', pointData);
  return pointData;
}
export default PointData;
