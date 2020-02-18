/**
 * makePointDataList - makes a list of weighted React components for data display.
 * @param {Array<any>} geoData - array with data for different places from database.
 * @param {String} dataType - a string equal in value with one of the data types: evnts, clicks...
 * @return {Array<any>} - a data array with location data to display on the map.
 */
const makePointDataList = (geoData, dataType) => {
  let scale = 0

  // set the scale to size data symbols on the map.
  switch (dataType) {
    case 'events':
      scale = 40000
      break
    case 'impressions':
      scale = 700000000
      break
    case 'revenue':
      scale = 2000000
      break
    case 'clicks':
      scale = 500000
      break
    default:
      break
  }

  // create array of React components for each symbol on the mao.
  const pointDataList = geoData.map(location => (
    { id: location.poi_id,
      value: Number(location[dataType] / scale),
      lat: location.lat,
      lng: location.lon,
      text: location.name
    }
  ))

  return pointDataList
}

export default makePointDataList
