import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'

/**
 * DailyDataTable - creates component to display daily data in a table.
 * @param {Object} - props - an object with data arrays fetched from the database.
 * @return {any} - a React component which displays a table with daily stats and events.
 */
const DailyDataTable = ({ statsDaily, eventsDaily }) => {
  // add event keys and values to the objects in the array of daily stats.
  eventsDaily.forEach(elem => {
    for (let i = 0; i < eventsDaily.length; i++) {
      if (statsDaily[i].date === elem.date) {
        statsDaily[i].events = elem.events
      }
    }
  })

  // format date and revenue values to display in the data table.
  const dataList = statsDaily.map(elem => {
    return {
      ...elem,
      date: elem.date.substring(0, 10),
      // round up to 2 decimals
      revenue: Number(elem.revenue).toFixed(2)
    }
  })

  return (
    <div style={{ maxWidth: '100%', marginTop: '9%' }}>
      <MaterialTable
        components={{
          Toolbar: props => (
            <div style = {{
              color: 'rgb(232, 234, 245)',
              backgroundColor: '#FF821D',
              fontWeight: 'bold'
            }}
            >
              <MTableToolbar {...props}/>
            </div>
          )
        }}
        options={{
          pageSize: 7,
          search: true,
          padding: 'dense',
          headerStyle: { color: '#940031', fontWeight: 'bold' }
        }}
        columns={[
          { title: 'Date', field: 'date', cellStyle: { padding: '10px' } },
          { title: 'Impressions', field: 'impressions' },
          { title: 'Revenue', field: 'revenue' },
          { title: 'Clicks', field: 'clicks' },
          { title: 'Events', field: 'events' }
        ]}
        data={dataList}
        title='Daily Data'
      />
    </div>
  )
}

export default DailyDataTable
