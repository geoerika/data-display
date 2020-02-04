import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupChart from './GroupChart';
import './App.css';

function App() {

   const [state, setState] = useState({
    eventsHourly: [],
    eventsDaily: [],
    statsHourly: [],
    statsDaily: [],
    poi: []
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
          poi: all[4].data
        }));
    });
  }, []);

  console.log('state: ', state);

  return (
    <div className="App">
      <GroupChart
        eventsHourly={ state.eventsHourly }
        eventsDaily={ state.eventsDaily }
        statsHourly={ state.statsHourly }
        statsDaily={ state.statsDaily }
        poi={ state.poi }
       />
    </div>
  );
}

export default App;
