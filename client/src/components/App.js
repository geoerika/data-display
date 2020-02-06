import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import './App.css';

function App() {

   const [state, setState] = useState({
    eventsHourly: [],
    eventsDaily: [],
    statsHourly: [],
    statsDaily: [],
    poi: [],
    dataArrived: false,
    showBarChart: false,
    showAreaChart: false
  });

  const axiosGet = (url) => {
    return axios
            .get(url)
            .catch((error) => {
              console.log(error.response.status);
              console.log(error.response.headers);
              console.log(error.response.data);
            })
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axiosGet('http://localhost:5555/events/hourly')
      ),
      Promise.resolve(
        axiosGet('http://localhost:5555/events/daily')
      ),
      Promise.resolve(
        axiosGet('http://localhost:5555/stats/hourly')
      ),
      Promise.resolve(
        axiosGet('http://localhost:5555/stats/daily')
      ),
      Promise.resolve(
        axiosGet('http://localhost:5555/poi')
      )
    ]).then((all) => {
        console.log('all: ', all);
        setState(prev => ({
          eventsHourly: all[0].data,
          eventsDaily: all[1].data,
          statsHourly: all[2].data,
          statsDaily: all[3].data,
          poi: all[4].data,
          dataArrived: true,
          showBarChart: false,
          showAreaChart: true
        }));
    });
  }, []);

  console.log('state: ', state);


  return (
    <div className="App">
      <Navigation/>
      { state.dataArrived &&
        state.showBarChart &&
        <BarChart
          eventsDaily={ state.eventsDaily }
          statsDaily={ state.statsDaily }
        />
      }
      { state.dataArrived &&
        state.showAreaChart &&
       <AreaChart
         statsHourly={ state.statsHourly }
         eventsHourly={ state.eventsHourly }
       />
      }
    </div>
  );
}

export default App;
