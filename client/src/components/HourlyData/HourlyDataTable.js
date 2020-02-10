import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'

/**
 * HourlyDataTable - creates component to display hourly data in a table.
 * @param {Object} - props - an object with data arrays fetched from the database.
 * @return {any} - a React component which displays a table with hourly stats and events.
 */
const HourlyDataTable = ({ statsHourly, eventsHourly }) => {
  /**
   * addDataForHour - creates aggregated data for each hour to display in the table.
   * @param {Number} i - number, current index in the processed array.
   * @param {Array} array - data array to use.
   * @param {String} dataType - string indicating which data is processed (events, clicks...).
   * @return {Number} -the sum per hour for a specific type of data.
   */
  const addDataForHour = (i, array, dataType) => {
    // initialize hour key with index value.
    const hourData = array.filter((elem) => {
      return elem.hour === i
    })

    // sums data for each type of data in the data array
    let sumOfData = hourData.reduce((acc, curElem) => {
      return acc + Number(curElem[dataType])
    }, 0)
    // round up to 2 decimals
    if (dataType === 'revenue') {
      sumOfData = sumOfData.toFixed(2)
    }
    return sumOfData
  }

  /**
   * createTableData - creates array containing sum of all data types per hour.
   * @return {Array} - the array with data to display in the table.
   */
  const createTableData = () => {
    const finalArray = []
    for (let i = 0; i < 24; i++) {
      finalArray[i] = {}
      finalArray[i].hour = i
      // creates array of houly objects
      finalArray[i].impressions = addDataForHour(i, statsHourly, 'impressions')
      finalArray[i].revenue = addDataForHour(i, statsHourly, 'revenue')
      finalArray[i].clicks = addDataForHour(i, statsHourly, 'clicks')
      finalArray[i].events = addDataForHour(i, eventsHourly, 'events')
    }
    return finalArray
  }

  const dataList = createTableData()

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        components={{
          Toolbar: (props) => (
            <div style =
              {{
                color: '#940031',
                backgroundColor: '#e8eaf5',
                fontWeight: 'bold'
              }}
            >
              <MTableToolbar { ...props }/>
            </div>
          )
        }}
        options={{
          pageSize: 10,
          search: true,
          padding: 'dense',
          headerStyle: { color: '#940031', fontWeight: 'bold' }
        }}
        columns={
          [
            { title: 'Hour', field: 'hour', cellStyle: { padding: '10px' } },
            { title: 'Impressions', field: 'impressions' },
            { title: 'Revenue', field: 'revenue' },
            { title: 'Clicks', field: 'clicks' },
            { title: 'Events', field: 'events' }
          ]
        }
        data={dataList}
        title='Hourly Data'
      />
    </div>
  )
}

export default HourlyDataTable
