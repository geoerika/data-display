import React, { useState } from "react";
import ChartButtons from './ChartButtons';
import './AreaChart.css';
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryArea } from 'victory';

export default function AreaChart(props) {

  const [state, setState] = useState({
    showRevenue: true,
    showImpressions: true,
    showClicks: true,
    showEvents: true
  });

  /**
   * createDataArray - adds data for each hour and makes an object for each hour with added data
   * @param {array, string} - data array from database and type of data (ie. events)
   * @return {array} - a data array with an object for each hour and added data
   */
  const createDataArray = (array, dataType) => {
    console.log('array: ', array);
    let finalArray = [];
    for (let i = 1; i < 24; i++) {
      finalArray[i - 1] = {};
      finalArray[i - 1].x = i;
      // creates array of same hour objects
      let hourData = array.filter((elem) => {
        return elem.hour === i;
      });
      console.log('hourData: ', hourData);
      finalArray[i - 1].y =
        hourData.reduce((acc, curElem) => {
          return acc + Number(curElem[dataType]);
        }, 0)
    }
    return finalArray;
  }

  let eventsHourlyData = createDataArray(props.eventsHourly, 'events');

  let impressionsHourlyData = createDataArray(props.statsHourly, 'impressions');

  let clicksHourlyData = createDataArray(props.statsHourly, 'clicks');

  let revenueHourlyData = createDataArray(props.statsHourly, 'revenue');

   // constants passed to hideAddData function so we setState to the right state comp
  const showImpressions = 'showImpressions';
  const showRevenue = 'showRevenue';
  const showClicks = 'showClicks';
  const showEvents = 'showEvents';

  const hideAddData = (elem) => {
    console.log('state in GroupChart: ', state);

    return state[elem] ?
            setState({...state, [elem]: false}) :
            setState({...state, [elem]: true});
  };

  return (
    <main className="area=chart">
      <ChartButtons
        onClickImpressions={ () => hideAddData(showImpressions) }
        onClickRevenue={ () => hideAddData(showRevenue) }
        onClickClicks={ () => hideAddData(showClicks) }
        onClickEvents={ () => hideAddData(showEvents)  }
      />
      <VictoryChart
         scale={{y: "log"}}
         minDomain={{y: 1}}
      >
        <VictoryAxis
          label={'hour'}
          tickValues={[2, 6, 10, 14, 18, 22]}
          style={{
            ticks: {stroke: "black", size: 4},
            axis: { line: {width: 4 } }

          }}
          tickLabelComponent={<VictoryLabel style={{fontSize: 8}}/>}
        />
        <VictoryAxis
          label={'log'}
          dependentAxis={true}
          style={{
            ticks: {stroke: "black", size: 4}
          }}
          tickValues={[1, 100, 10000, 1000000]}
          tickLabelComponent={<VictoryLabel
                                style={{fontSize: 8}}
                                dx={5}/>
                              }
        />
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.5 }
          }}
        >
          { state.showImpressions &&
            <VictoryArea
              style={{
                data: { fill: "yellow", stroke: "gold" }
              }}
              data={impressionsHourlyData}
            />
          }
          { state.showRevenue &&
            <VictoryArea
              style={{
                data: { fill: "lime", stroke: "lime" }
              }}
              data={revenueHourlyData}
            />
          }
          { state.showClicks &&
            <VictoryArea
              style={{
                data: { fill: "magenta", stroke: "magenta" }
              }}
              data={clicksHourlyData}
            />
          }
          { state.showEvents &&
            <VictoryArea
              style={{
                data: { fill: "mediumslateblue", stroke: "mediumslateblue" }
              }}
              data={eventsHourlyData}
            />
          }
        </VictoryGroup>
      </VictoryChart>
    </main>
  );
}