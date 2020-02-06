import React from "react";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import ChartButtons from './ChartButtons';
import useHideAddData from '../hooks/useHideAddData';
import './BarChart.css';

export default function BarChart(props) {

  console.log('props in BarChart: ', props);

 // sets all variables to true to show all data on chart initially
  const { showImpressions,
          showRevenue,
          showClicks,
          showEvents,
          hideAddData } = useHideAddData('');

  const dateFormating =(date) => {
    return date.substring(0, 10);
  };

  let eventsDailyData = props.eventsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Number(elem.events) }
  });

  let impressionsDailyData = props.statsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Number(elem.impressions) }
  });

  let clicksDailyData = props.statsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Number(elem.clicks) }
  });

  let revenueDailyData = props.statsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Number(elem.revenue) }
  });

  // constants passed to hideAddData function so we setState to the right state variables
  const SHOWIMPRESSIONS = 'showImpressions';
  const SHOWREVENUE = 'showRevenue';
  const SHOWCLICKS = 'showClicks';
  const SHOWEVENTS = 'showEvents';

  return (
    <main className="bar-chart">
      <ChartButtons
        onClickImpressions={ () => hideAddData(SHOWIMPRESSIONS) }
        onClickRevenue={ () => hideAddData(SHOWREVENUE) }
        onClickClicks={ () => hideAddData(SHOWCLICKS) }
        onClickEvents={ () => hideAddData(SHOWEVENTS)  }
      />
      <VictoryChart
        domainPadding={25}
         scale={{y: "log"}}
         minDomain={{y: 1}}
        // theme={VictoryTheme.material}
      >
        <VictoryAxis
          label={'date'}
          style={{
            ticks: {stroke: "black", size: 4},
            axis: { line: {width: 4 } }
          }}
          tickLabelComponent={ <VictoryLabel style={{fontSize: 8}}/> }
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

        <VictoryGroup offset={11}>
          { showImpressions &&
            <VictoryBar
              data={ impressionsDailyData }
              style={{ data: { fill: "#940031"}}}
            />
          }
          { showRevenue &&
            <VictoryBar
              data={ revenueDailyData }
              style={{ data: { fill: "#C43343"}}}
            />
          }
          { showClicks &&
            <VictoryBar
              data={ clicksDailyData }
              style={{ data: { fill: "#DC5429"}}}
            />
          }
          {  showEvents &&
              <VictoryBar
                data={ eventsDailyData }
                style={{ data: { fill: "#FF821D"}}}
            />
          }
        </VictoryGroup>
      </VictoryChart>
    </main>
  )
}
