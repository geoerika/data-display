import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PointOfInterest.css';

/**
 * PointOfInterest - defines a loaction symbol as a React component to display locations on the map.
 * @return {any} - a React component to locations data on the map.
 */
const PointOfInterest = () => {

  return (
      <div>
        <FontAwesomeIcon className="point-of-interest" icon="map-marker-alt" />
      </div>
    )
};

export default PointOfInterest;
