import React from 'react'

/**
 * PointData - creates a circle as a React component to display data on the map.
 * @param {Object<Number>} props- an object with a value to scale the symbol on the map.
 * @return {any} - a React component to display data on the map.
 */
const PointData = ({ value, dataType }) => {
  let color = ''
  // set background color to symbols on the map.
  switch (dataType) {
    case 'events':
      color = 'blueviolet'
      break
    case 'impressions':
      color = 'yellow'
      break
    case 'revenue':
      color = 'lime'
      break
    case 'clicks':
      color = 'magenta'
      break
    default:
      break
  }

  const pointData = (
    <div className='circle'
      style={{
        height: value,
        width: value,
        borderRadius: '50%',
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: '2px',
        backgroundColor: color,
        opacity: 0.5
      }}
    />
  )

  return pointData
}

export default PointData
