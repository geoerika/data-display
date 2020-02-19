import React from 'react'
import ClusterMarkerSymbol from './ClusterMarkerSymbol.png'
import './ClusterMarker.scss'

/**
 * ClusterMarker - creates ClusterMarker component, with nr of points displayed.
 * @param {String} text - number of data points in the cluster.
 * @return {any} - a React component representing a data cluster on the map.
 */
const ClusterMarker = ({ text }) => {
  return (
    <div className='marker' >
      <img src={ ClusterMarkerSymbol } alt={ 'ClusterImage' } style={{ width: '100%' }}/>
      <div className='text'>
        { text }
      </div>
    </div>
  )
}

export default ClusterMarker
