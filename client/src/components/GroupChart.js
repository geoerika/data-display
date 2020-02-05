import React from "react";
import { VictoryChart, VictoryGroup, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import moment from 'moment';

export default function GroupChart(props) {

  const dateFormating =(date) => {
    return date.substring(0, 10);
  };

  let eventsDailyData = props.eventsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Number(elem.events) }
  });

  let impressionsDailyData = props.statsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Math.log(Number(elem.impressions)) }
  });

  let clicksDailyData = props.statsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Math.log(Number(elem.clicks)) }
  });

  let revenueDailyData = props.statsDaily.map((elem) => {
    return { x: dateFormating(elem.date), y: Math.log(Number(elem.revenue)) }
  });

  const substractDayfromDate = (date)=> {
    let newdate = moment(date);
    console.log('newdate: ', newdate);
    return moment(date).subtract(1, 'day').format('YYYY-MM-DD');
  }

  let minDomain = {};
  if(props.eventsDaily[0]) {
    minDomain = substractDayfromDate(props.eventsDaily[0].date);
    console.log(minDomain);
  }

  eventsDailyData.unshift({x: minDomain, y: 0});

  return (
    <main className="group_chart">
      <VictoryChart>
        <VictoryAxis
          label={'date'}
          tickLabelComponent={<VictoryLabel style={{fontSize: '8px'}}/>}
          scale={{y: "log"}}
        />
        <VictoryAxis
          label={'number of events'}
          dependentAxis={true}
          tickLabelComponent={<VictoryLabel style={{fontSize: '8px'}}/>}
          scale={{y: "log"}}
        />
        <VictoryGroup offset={10}
          colorScale={"blue"}
        >
          <VictoryBar
            data={ eventsDailyData }
          />
          <VictoryBar
            data={ impressionsDailyData }
          />
          <VictoryBar
            data={ clicksDailyData }
          />
            <VictoryBar
            data={ revenueDailyData }
          />
        </VictoryGroup>
      </VictoryChart>
    </main>
  )
}
