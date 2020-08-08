import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  
  const API_US = 'https://covidtracking.com/api/us';

  // retrieves the positive cases, recovered cases, total deaths, and last time of update from the API
  // the API returns a response array of length 1, where the only element is an object containing all the data
  const fetchData = async () => {
    try {
      await axios.get(API_US).then(response => {
        const responseObject = response.data[0];
        const { dateChecked, positive, recovered, death } = responseObject;
        setData({dateChecked, positive, recovered, death});
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  // first useEffect() hook will trigger once, updating the state data with no dependencies
  useEffect(() => {
    const retrival = async () => await fetchData();
    retrival();
  }, [])

  // this useEffect() hook will trigger every time the state's data is changed
  // this is used for now to check for accurate data retrival
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data])

  // display data to make sure state is set properly
  return (
    <div className="App">
      <h1>COVID-19 US Tracker</h1>
      <h2>Last Updated: {new Date(data.dateChecked).toString()}</h2>
      <h2>Number of People Infected: {data.positive}</h2>
      <h2>Number of People Recovered: {data.recovered}</h2>
      <h2>Total Deaths: {data.death}</h2>
    </div>
  );
}

export default App;
