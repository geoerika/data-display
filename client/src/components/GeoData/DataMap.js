import React from 'react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import withPropsOnChange from 'recompose/withPropsOnChange'
import GoogleMapReact from 'google-map-react'
import ClusterMarker from './markers/ClusterMarker'
import SimpleMarker from './markers/SimpleMarker'
import supercluster from 'points-cluster'
import makePointDataList from './helpers/makePointDataList'

/**
 * DataMap - functional React component a map with our data.
 * @param {Array<any>} poiData - our aggregated location list with data.
 * @param {String} dataType - string suggesting type of data we are to display.
 * @return {any} - React component with a map and data.
 */
const DataMap = ({ poiData, dataType }) => {
  let markersData = []
  // set markersData list.
  markersData = makePointDataList(poiData, dataType)
  // the HOC loses data value and dataType obtained in the list above.
  // so we retrive value back with lat and lng.
  const getValue = (lat, lng) => {
    return markersData.filter(elem => ((elem.lat === lat) &&
                                      (elem.lng === lng))
    )[0].value
  }

  const GMAPAPIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY

  // code below has been modified from https://github.com/istarkov/google-map-clustering-example.
  const GMap = ({
    markersData,
    options,
    mapProps: { center, zoom },
    onChange,
    clusters
  }) => (
    <div style={{ height: '90vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPAPIKEY }}
        options={options}
        center={center}
        zoom={zoom}
        onChange={onChange}
      >
        {
          clusters
            .map(({ id, numPoints, ...props }) => (
              numPoints === 1
                ? <SimpleMarker
                    key={id}
                    lat={ props.lat }
                    lng={ props.lng }
                    dataType={ dataType }
                    // retrieve value at point location.
                    value={ getValue(props.lat, props.lng) }
                  />
                : <ClusterMarker key={id} {...props}/>
            ))
        }
      </GoogleMapReact>
    </div>
  )

  const GMapHOC = compose(
    defaultProps({
      clusterRadius: 62,
      options: {
        minZoom: 3,
        maxZoom: 15
      }
    }),
    // withState so you could change markers if you want.
    withState(
      'markers',
      'setMarkers',
      markersData
    ),
    withState(
      'mapProps',
      'setMapProps',
      {
        center: {
          lat: 44,
          lng: -98
        },
        zoom: 4
      }
    ),
    // describe events.
    withHandlers({
      onChange: ({ setMapProps }) => ({ center, zoom, bounds }) => {
        setMapProps({ center, zoom, bounds })
      }
    }),
    // precalculate clusters if markers data has changed.
    withPropsOnChange(
      ['markers'],
      ({ markers = [], clusterRadius, options: { minZoom, maxZoom } }) => ({
        getCluster: supercluster(
          markers,
          {
            minZoom, // min zoom to generate clusters on.
            maxZoom, // max zoom level to cluster the points on.
            radius: clusterRadius // cluster radius in pixels.
          }
        )
      })
    ),
    // get clusters specific for current bounds and zoom.
    withPropsOnChange(
      ['mapProps', 'getCluster'],
      ({ mapProps, getCluster }) => ({
        clusters: mapProps.bounds
          ? getCluster(mapProps).map(({ wx, wy, numPoints, points }) => ({
              lat: wy,
              lng: wx,
              text: numPoints,
              numPoints,
              id: `${numPoints}_${points[0].id}`
          }))
          : []
      })
    )
  )

  const DataMapFinal = GMapHOC(GMap)
  return <DataMapFinal/>
}

export default DataMap
