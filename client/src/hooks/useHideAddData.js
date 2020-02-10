import { useState } from 'react'

/**
 * useHideAddData - deletes or adds data in charts, maps.
 *                - show/hides map data table.
 * @param {object} initialState - an object to set inital values in the state.
 * @param {string} elem - a string equal in value to one of the state keys.
 * @return {object} - an object which includes the state and two functions.
 */
const useHideAddData = (initialState, elem) => {
  // set initial visibility of data in charts and map.
  const [state, setState] = useState({
    showRevenue: initialState.revenue,
    showImpressions: initialState.impressions,
    showClicks: initialState.clicks,
    showEvents: initialState.events,
    showLocations: initialState.locations,
    showDataTable: false
  })

  console.log('state in hook: ', state)

  /**
   * hideAddData - resets the values of state variables.
   * @param {string} elem - a string equal in value to one of the state keys.
   */
  const hideAddData = (elem) => {
    if (elem) {
      state[elem]
        ? setState({ ...state, [elem]: false })
        : setState({ ...state, [elem]: true })
    }
  }

  /**
    * selectDataOnMap - setting the var state to false except the one selected to show data.
    * @param {String} elem - a string equal in value to one of the state keys.
    */
  const selectDataOnMap = (elem) => {
    console.log()
    // first we hide all data, then we we show only the selected data.
    setState({
      showRevenue: false,
      showImpressions: false,
      showClicks: false,
      showEvents: false,
      showLocations: false,
      [elem]: true
    })
  }

  return { ...state, hideAddData, selectDataOnMap }
}

export default useHideAddData
