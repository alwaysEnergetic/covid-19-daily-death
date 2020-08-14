import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import coronavirusLogo from './images/covid19-logo.jpg';
import { DataCards, Chart } from "./components"
import { fetchData } from "./api/index"
import Footer from 'rc-footer'

function App() {
  const [data, setData] = useState({});
  
  // first useEffect() hook will trigger once, updating the state data with no dependencies
  useEffect(() => {
    const retrieval = async () => {
       setData(await fetchData());
     }
    retrieval()
  }, [])

  // this useEffect() hook will trigger every time the state's data is changed
  // this is used for now to check for accurate data retrieval
  useEffect(() => {
    if (data) {
      console.log("Data:", data);
    }
  }, [data])

  return (
    <div className={styles.app}>
      <img src={coronavirusLogo} alt="COVID-19 LOGO" className={styles.image}/>
      <h1>United States</h1>
      <DataCards data={data}/>
      <Chart data={data} />
      <p>Data Last Updated: {new Date(data.dateChecked).toDateString()}</p>
      <Footer bottom="Made with ❤️ by Kenneth Nguyen" backgroundColor="#ffffff"/>
    </div>
  );
}

export default App;
