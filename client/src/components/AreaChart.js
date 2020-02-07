import React from "react";
import ChartButtons from './ChartButtons';
import useHideAddData from '../hooks/useHideAddData';
import './AreaChart.css';
import { VictoryChart, VictoryAxis, VictoryLabel,
         VictoryGroup, VictoryArea } from 'victory';

function AreaChart(props) {

  // sets all variables to true to show initially all data on chart
  const { showImpressions,
          showRevenue,
          showClicks,
          showEvents,
          hideAddData } = useHideAddData('');

  /**
   * createDataArray - adds data for each hour and makes an object for each hour with added data
   * @param {array, string} - data array from database and type of data (ie. events)
   * @return {array} - a data array with an object for each hour and added data
   */
  const createDataArray = (array, dataType) => {

    let finalArray = [];
    for (let i = 1; i < 24; i++) {
      finalArray[i - 1] = {};
      finalArray[i - 1].x = i;
      // creates array of same hour objects
      let hourData = array.filter((elem) => {
        return elem.hour === i;
      });

      finalArray[i - 1].y =
        hourData.reduce((acc, curElem) => {
          return acc + Number(curElem[dataType]);
        }, 0)
    }
    return finalArray;
  }

  // create arrays of objects for displaying data in charts
  let eventsHourlyData = createDataArray(props.eventsHourly, 'events');
  let impressionsHourlyData = createDataArray(props.statsHourly, 'impressions');
  let clicksHourlyData = createDataArray(props.statsHourly, 'clicks');
  let revenueHourlyData = createDataArray(props.statsHourly, 'revenue');

  // constants passed to hideAddData function so we setState to the right state variables
  const SHOWIMPRESSIONS = 'showImpressions';
  const SHOWREVENUE = 'showRevenue';
  const SHOWCLICKS = 'showClicks';
  const SHOWEVENTS = 'showEvents';

  return (
    <main className="area-chart">
      <ChartButtons
        onClickImpressions={ () => hideAddData(SHOWIMPRESSIONS) }
        onClickRevenue={ () => hideAddData(SHOWREVENUE) }
        onClickClicks={ () => hideAddData(SHOWCLICKS) }
        onClickEvents={ () => hideAddData(SHOWEVENTS)  }
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
          tickLabelComponent={
            <VictoryLabel
              style={{fontSize: 8}}
            />
          }
        />
        <VictoryAxis
          label={'log'}
          dependentAxis={true}
          style={{
            ticks: {stroke: "black", size: 4}
          }}
          tickValues={[1, 100, 10000, 1000000]}
          tickLabelComponent={
            <VictoryLabel
              style={{fontSize: 8}}
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
                  fill: "yellow",
                  stroke: "gold"
                }
              }}
              data={impressionsHourlyData}
            />
          }
          { showRevenue &&
            <VictoryArea
              style={{
                data: {
                  fill: "lime",
                  stroke: "lime"
                }
              }}
              data={revenueHourlyData}
            />
          }
          { showClicks &&
            <VictoryArea
              style={{
                data: {
                  fill: "magenta",
                  stroke: "magenta"
                }
              }}
              data={clicksHourlyData}
            />
          }
          { showEvents &&
            <VictoryArea
              style={{
                data: {
                  fill: "mediumslateblue",
                  stroke: "mediumslateblue"
                }
              }}
              data={eventsHourlyData}
            />
          }
        </VictoryGroup>
      </VictoryChart>
    </main>
  );
}

export default AreaChart;
