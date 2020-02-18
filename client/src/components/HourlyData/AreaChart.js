import React from 'react'
import Buttons from '../shared/Buttons'
import useHideAddData from '../../hooks/useHideAddData'
import {
  VictoryChart, VictoryAxis, VictoryLabel,
  VictoryGroup, VictoryArea
} from 'victory'
import '../shared/Buttons.scss'

/**
 * AreaChart - creates component to display hourly data on a chart.
 * @param {object} - an object with data arrays for stats and events.
 * @return {any} - a React component.
 */
const AreaChart = ({ eventsHourly, statsHourly }) => {
  // sets all variables to true to show initially all data on chart.
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

  /**
   * createDataArray - adds data for each hour and makes an object for each hour with added data.
   * @param {Array, String} - data array from database and type of data (ie. events).
   * @return {Array} - a data array with an object for each hour and added data.
   */
  const createDataArray = (array, dataType) => {
    const finalArray = []
    for (let i = 1; i < 24; i++) {
      finalArray[i - 1] = {}
      finalArray[i - 1].x = i
      // creates array of same hour objects.
      const hourData = array.filter((elem) => {
        return elem.hour === i
      })

      finalArray[i - 1].y =
        hourData.reduce((acc, curElem) => {
          return acc + Number(curElem[dataType])
        }, 0)
    }
    return finalArray
  }

  // create arrays of objects for displaying data in charts.
  const eventsHourlyData = createDataArray(eventsHourly, 'events')
  const impressionsHourlyData = createDataArray(statsHourly, 'impressions')
  const clicksHourlyData = createDataArray(statsHourly, 'clicks')
  const revenueHourlyData = createDataArray(statsHourly, 'revenue')

  // constants passed to hideAddData function so we setState to the right state variables.
  const SHOWIMPRESSIONS = 'showImpressions'
  const SHOWREVENUE = 'showRevenue'
  const SHOWCLICKS = 'showClicks'
  const SHOWEVENTS = 'showEvents'

  return (
    <main className='area-chart'>
      <Buttons
        onClickImpressions={ () => hideAddData(SHOWIMPRESSIONS) }
        onClickRevenue={ () => hideAddData(SHOWREVENUE) }
        onClickClicks={ () => hideAddData(SHOWCLICKS) }
        onClickEvents={ () => hideAddData(SHOWEVENTS) }
      />
      <VictoryChart
        scale={{ y: 'log' }}
        minDomain={{ y: 1 }}
      >
        <VictoryAxis
          label={ 'hour' }
          tickValues={ [2, 6, 10, 14, 18, 22] }
          style={{
            ticks: { stroke: 'black', size: 4 },
            axis: { line: { width: 4 } }
          }}
          tickLabelComponent={
            <VictoryLabel
              style={{ fontSize: 8 }}
            />
          }
        />
        <VictoryAxis
          dependentAxis={ true }
          style={{
            ticks: { stroke: 'black', size: 4 }
          }}
          tickValues={ [1, 100, 10000, 1000000] }
          tickLabelComponent={
            <VictoryLabel
              style={{ fontSize: 8 }}
              dx={5}
            />
          }
        />
        <VictoryGroup
          style={{
            data: {
              strokeWidth: 3,
              fillOpacity: 0.5
            }
          }}
        >
          { showImpressions &&
            <VictoryArea
              style={{
                data: {
                  fill: '#FF821D',
                  stroke: '#FF821D'
                }
              }}
              data={ impressionsHourlyData }
            />
          }
          { showRevenue &&
            <VictoryArea
              style={{
                data: {
                  fill: '#DC5429',
                  stroke: '#DC5429'
                }
              }}
              data={ revenueHourlyData }
            />
          }
          { showClicks &&
            <VictoryArea
              style={{
                data: {
                  fill: '#C43343',
                  stroke: '#C43343'
                }
              }}
              data={ clicksHourlyData }
            />
          }
          { showEvents &&
            <VictoryArea
              style={{
                data: {
                  fill: '#940031',
                  stroke: '#940031'
                }
              }}
              data={ eventsHourlyData }
            />
          }
        </VictoryGroup>
      </VictoryChart>
    </main>
  )
}

export default AreaChart
