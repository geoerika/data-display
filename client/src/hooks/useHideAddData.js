import { useState } from "react";

/**
 * useHideAddData - deletes or adds data to charts
 * @param {string} elem - a string equal in value to one of the state keys
 * @return {object} - an object which includes the state and a function
 */
export default function useHideAddData(elem) {

  const [state, setState] = useState({
    showRevenue: true,
    showImpressions: true,
    showClicks: true,
    showEvents: true
  });

  console.log('state in hook: ', state);

  /**
   * hideAddData - sets the values of state variables
   * @param {string} elem - a string equal in value to one of the state keys
   */
  function hideAddData(elem) {
    if(elem) {
      state[elem] ?
        setState({...state, [elem]: false}) :
        setState({...state, [elem]: true});
    }
  }

  return { ...state, hideAddData };
}