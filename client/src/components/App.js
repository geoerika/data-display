import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Navigation from './Navigation'
import DailyData from './DailyData/DailyData'
import HourlyData from './HourlyData/HourlyData'
import GeoData from './GeoData/index'
import './App.css'

const App = () => {

  return (
    <main className='App'>
      <Navigation/>
      <Switch>
        <Route path='/home' component={ Home }/>
        <Route path='/dailydata' component={ DailyData }/>
        <Route path='/hourlydata' component={ HourlyData }/>
        <Route path='/geodata' component={ GeoData }/>
      </Switch>
    </main>
  )
}

export default App
