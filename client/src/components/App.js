import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Navigation';
import DailyData from './DailyData';
import HourlyData from './HourlyData';
import GeoMapData from './GeoData/GeoMapData';
import './App.css';

function App() {

  // const [state, setState] = useState({
  //   eventsHourly: [],
  //   eventsDaily: [],
  //   statsHourly: [],
  //   statsDaily: [],
  //   poi: [],
  //   dataLoading: true
  // });

  // const axiosGet = (url) => {
  //   return axios
  //           .get(url)
  //           .catch((error) => {
  //             console.log(error.response.status);
  //             console.log(error.response.headers);
  //             console.log(error.response.data);
  //           })
  // };

  // useEffect(() => {
  //   Promise.all([
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/events/hourly')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/events/daily')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/stats/hourly')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/stats/daily')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/poi')
  //     )
  //   ]).then((all) => {
  //       console.log('all: ', all);
  //       setState(prev => ({
  //         eventsHourly: all[0].data,
  //         eventsDaily: all[1].data,
  //         statsHourly: all[2].data,
  //         statsDaily: all[3].data,
  //         poi: all[4].data,
  //         dataLoading: false
  //       }));
  //   });
  // }, []);


  // async const fetchData =() => {
  //   try {
  //           this.setState({...this.state, isFetching: true});
  //           const response = await axios.get(USER_SERVICE_URL);
  //           this.setState({users: response.data, isFetching: false});
  //       } catch (e) {
  //           console.log(e);
  //           this.setState({...this.state, isFetching: false});
  //       }
  //   await Promise.all([
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/events/hourly')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/events/daily')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/stats/hourly')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/stats/daily')
  //     ),
  //     Promise.resolve(
  //       axiosGet('http://localhost:5555/poi')
  //     )
  //   ]).then((all) => {
  //       console.log('all: ', all);
  //       setState(prev => ({
  //         eventsHourly: all[0].data,
  //         eventsDaily: all[1].data,
  //         statsHourly: all[2].data,
  //         statsDaily: all[3].data,
  //         poi: all[4].data,
  //         dataLoading: false
  //       }));
  //   });
  // }


  // console.log('state: ', state);

//   return (
//     <main className="App">
//       <Navigation/>
//       <Switch>
//         <Route path="/dailydata"
//                 render={ props => (
//                     <DailyData
//                       eventsDaily={ state.eventsDaily }
//                       statsDaily={ state.statsDaily }
//                     />

//                 )}
//         />
//         <Route path="/hourlydata"
//                 render={
//                   props => (
//                     <HourlyData
//                       eventsDaily={ state.eventsHourly }
//                       statsDaily={ state.statsHourly }
//                     />
//                   )
//                 }
//         />
//         <Route path="/geodata" component={GeoMapData} />
//         <Route component={""} />
//       </Switch>
//     </main>
//   );
// }

return (
    <main className="App">
      <Navigation/>
      <Switch>
        <Route path="/dailydata"
                render={ props => (
                    <DailyData

                    />

                )}
        />
        <Route path="/hourlydata"
                render={
                  props => (
                    <HourlyData

                    />
                  )
                }
        />
        <Route path="/geodata" component={GeoMapData} />
        <Route component={""} />
      </Switch>
    </main>
  );
}

export default App;
