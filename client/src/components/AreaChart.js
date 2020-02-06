import React from "react";
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup, VictoryArea } from 'victory';

export default function AreaChart(props) {

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

  return (
    <main className="area=chart">
      <VictoryChart
         scale={{y: "log"}}
         minDomain={{y: 1}}
      >
       <VictoryAxis
          label={'hour'}
          tickValues={[2, 6, 10, 14, 18, 22]}
          style={{
            ticks: {stroke: "black", size: 4}
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
          <VictoryArea
            style={{
              data: { fill: "yellow", stroke: "gold" }
            }}
            data={impressionsHourlyData}
          />
          <VictoryArea
            style={{
              data: { fill: "lime", stroke: "lime" }
            }}
            data={revenueHourlyData}
          />
          <VictoryArea
            style={{
              data: { fill: "magenta", stroke: "magenta" }
            }}
            data={clicksHourlyData}
          />
          <VictoryArea
            style={{
              data: { fill: "cyan", stroke: "cyan" }
            }}
            data={eventsHourlyData}
          />


        </VictoryGroup>
      </VictoryChart>
    </main>
  );
}