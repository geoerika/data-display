import React, { useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis, VictoryLabel, VictoryTheme } from 'victory';
import ChartButtons from './ChartButtons';

export default function BarChart(props) {

  console.log('props in BarChart: ', props);

  const [state, setState] = useState({
    showRevenue: true,
    showImpressions: true,
    showClicks: true,
    showEvents: true
  });

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

  // constants passed to hideAddData function so we setState to the right state comp
  const showRevenue = 'showRevenue';
  const showImpressions = 'showImpressions';
  const showClicks = 'showClicks';
  const showEvents = 'showEvents';


  const hideAddData = (elem) => {
    console.log('state in GroupChart: ', state);

    return state[elem] ?
            setState({...state, [elem]: false}) :
            setState({...state, [elem]: true});
  };

  return (
    <main className="bar-chart">
      <ChartButtons
        onClickRevenue={ () => hideAddData(showRevenue) }
        onClickImpressions={ () => hideAddData(showImpressions) }
        onClickClicks={ () => hideAddData(showClicks) }
        onClickEvents={ () => hideAddData(showEvents)  }
      />
      <VictoryChart
        domainPadding={25}
         scale={{y: "log"}}
         minDomain={{y: 1}}
        // theme={VictoryTheme.material}
      >
        <VictoryAxis
          label={'date'}
          tickLabelComponent={ <VictoryLabel style={{fontSize: 6}}/> }
        />
        <VictoryAxis
          label={'log'}
          dependentAxis={true}
          tickLabelComponent={ <VictoryLabel style={{fontSize: 6}}/> }
        />

        <VictoryGroup offset={11}>
        { state.showImpressions &&
            <VictoryBar
              data={ impressionsDailyData }
              style={{ data: { fill: "#940031"}}}
            />
          }
          { state.showRevenue &&
            <VictoryBar
              data={ revenueDailyData }
              style={{ data: { fill: "#C43343"}}}
            />
          }
          { state.showClicks &&
            <VictoryBar
              data={ clicksDailyData }
              style={{ data: { fill: "#DC5429"}}}
            />
          }
          {  state.showEvents &&
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
