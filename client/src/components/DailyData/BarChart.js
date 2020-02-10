import React from 'react'
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis, VictoryLabel } from 'victory'
import Buttons from '../shared/Buttons'
import useHideAddData from '../../hooks/useHideAddData'
import '../shared/Buttons.css'

/**
 * BarChart - creates component to display daily data on a chart.
 * @param {Object} - an object with data arrays for stats and events.
 * @return {any} - a React component.
 */
export default function BarChart ({ eventsDaily, statsDaily }) {
  // sets all chart data variables to true to show all data on chart initially.
  const {
    showImpressions,
    showRevenue,
    showClicks,
    showEvents,
    hideAddData
  } =
  useHideAddData({
    impressions: true,
    revenue: true,
    clicks: true,
    events: true
  })

  // constants passed to hideAddData function so we setState to the right state variables.
  const SHOWIMPRESSIONS = 'showImpressions'
  const SHOWREVENUE = 'showRevenue'
  const SHOWCLICKS = 'showClicks'
  const SHOWEVENTS = 'showEvents'

  // shorten date string for display in chart.
  const dateFormating = (date) => {
    return date.substring(0, 10)
  }

  /**
   * formatBarChartData - constructs objects with x, y values for chart.
   * @param {Array, String} - data array from database and type of data (ie. events).
   * @return {Array} - a data array with an object for each day and added data.
   */
  const formatBarChartData = (array, dataType) => {
    return array.map((elem) => {
      return {
        x: dateFormating(elem.date),
        y: Number(elem[dataType])
      }
    })
  }

  // creates formatted data for each bar on the chart.
  const eventsDailyData = formatBarChartData(eventsDaily, 'events')
  const impressionsDailyData = formatBarChartData(statsDaily, 'impressions')
  const clicksDailyData = formatBarChartData(statsDaily, 'clicks')
  const revenueDailyData = formatBarChartData(statsDaily, 'revenue')

  return (
    <div>
      <Buttons
        onClickImpressions={ () => hideAddData(SHOWIMPRESSIONS) }
        onClickRevenue={ () => hideAddData(SHOWREVENUE) }
        onClickClicks={ () => hideAddData(SHOWCLICKS) }
        onClickEvents={ () => hideAddData(SHOWEVENTS) }
      />
      {/* we are using Victory charts to create charts */}
      <VictoryChart
        domainPadding={ 25 }
        scale={{ y: 'log' }}
        minDomain={{ y: 1 }}
      >
        <VictoryAxis
          label={ 'date' }
          style={{
            ticks: { stroke: 'black', size: 4 },
            axis: { line: { width: 4 } }
          }}
          tickLabelComponent={
            <VictoryLabel style={{ fontSize: 8 }}/>
          }
        />
        <VictoryAxis
          label={ 'log' }
          dependentAxis={ true }
          style={{
            ticks: { stroke: 'black', size: 4 }
          }}
          tickValues={ [1, 100, 10000, 1000000] }
          tickLabelComponent={
            <VictoryLabel
              style={{ fontSize: 8 }}
              dx={ 5 }
            />
          }
        />
        <VictoryGroup offset={ 11 }>
          { showImpressions &&
            <VictoryBar
              data={ impressionsDailyData }
              style={{ data: { fill: '#FF821D' } }}
            />
          }
          { showRevenue &&
            <VictoryBar
              data={ revenueDailyData }
              style={{ data: { fill: '#DC5429' } }}
            />
          }
          { showClicks &&
            <VictoryBar
              data={ clicksDailyData }
              style={{ data: { fill: '#C43343' } }}
            />
          }
          { showEvents &&
            <VictoryBar
              data={ eventsDailyData }
              style={{ data: { fill: '#940031' } }}
            />
          }
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}
