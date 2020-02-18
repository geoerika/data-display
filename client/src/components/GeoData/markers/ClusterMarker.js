import React from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import clusterMarkerStyles from './ClusterMarker.scss'
import ClusterMarkerSymbol from './ClusterMarkerSymbol.png'

// code below has been modified from https://github.com/istarkov/google-map-clustering-example.
export const clusterMarker = ({ styles, text }) => (
  <div className={ styles.marker } >
    <div className={ styles.text } >
      { text }
    </div>
    <div>
      <img src={ ClusterMarkerSymbol }
        alt= {'https://github.com/googlemaps/v3-utility-library/blob/master/markerclusterer/images/m4.png'}
      />
    </div>
  </div>
)

export const clusterMarkerHOC = compose(
  defaultProps({
    text: '0',
    styles: clusterMarkerStyles,
    initialScale: 0.6,
    defaultScale: 1
  })
)

export default clusterMarkerHOC(clusterMarker)
