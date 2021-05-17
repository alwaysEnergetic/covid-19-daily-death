import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import coronavirusLogo from "./images/covid19-logo.jpg";
import { DataCards, Chart, StateSelector } from "./components";
import {
  fetchUS,
  fetchDailyUS,
  fetchStates,
  fetchStatesDaily,
} from "./api/index";
import Footer from "rc-footer";

function App() {
  const [data, setData] = useState({}); // current data of United States or an individual state
  const [dailyData, setDailyData] = useState([]); // array of objects representing each day's data for the United States or individual state
  const [currentState, setCurrentState] = useState("United States"); // the current state selected

  // run every time currentState changes; i.e. a different state is selected
  // if the currentState is the United States option, set the data states to be the US data
  // else the currentState is one of the other options so set the data states to be of that individual state
  useEffect(() => {
    const retrieval = async () => {
      if (currentState === "United States") {
        setData(await fetchUS());
        setDailyData(await fetchDailyUS());
      } else {
        setData(await fetchStates(currentState));
        setDailyData(await fetchStatesDaily(currentState));
      }
    };
    retrieval();
  }, [currentState]);

  // // this useEffect() hook will trigger every time the state's data is changed
  // // this is used for now to check for accurate data retrieval
  // useEffect(() => {
  //   console.log("Data:", data);
  // }, [data])

  // // debugging for change in daily data
  // useEffect(() => {
  //   console.log("Change in daily data: ", dailyData);
  // }, [dailyData])

  // // debugging for change on click state option
  // useEffect(() => {
  //   console.log("Current state option:", currentState);
  // }, [currentState])

  // onChange function when selecting a new state
  const handleChangeState = (newState) => {
    setCurrentState(newState);
  };

  return (
    <div className={styles.app}>
      <img src={coronavirusLogo} alt="COVID-19 LOGO" className={styles.image} />
      <h1>Currently Displaying: {currentState}</h1>
      <StateSelector handleChangeState={handleChangeState} />
      <DataCards data={data} />
      <Chart data={data} dailyData={dailyData} />
      {data.dateChecked && (
        <p>Data Last Updated: {new Date(data.dateChecked).toDateString()}</p>
      )}
      <Footer
        bottom="Made with ❤️ by Kenneth Nguyen"
        backgroundColor="#ffffff"
      />
    </div>
  );
}

export default App;
