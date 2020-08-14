import  React, { useState, useEffect } from 'react'
import { Line, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css"
import axios from 'axios';

// destructure the data state being passed in
function Chart({data: {positive, recovered, death} }) {
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);

    // * LOOK INTO REFACTORING API AXIOS CALLS INTO A SEPERATE FILE INSTEAD OF IN COMPONENTS * 
    const API_DAILY = 'https://covidtracking.com/api/us/daily'

    useEffect(() => {
        const fetchDailyData = async () => {
            try {
                await axios.get(API_DAILY).then(response => {
                    const responseObject = response.data;
                    const mappedDailyObject = responseObject.map(data => ({
                        date: data.dateChecked.substring(0, 10),
                        positive: data.positive,
                        recovered: data.recovered,
                        death: data.death,
                    }))
                    const reverseDailyObject = mappedDailyObject.reverse();
                    setDailyData(reverseDailyObject)
                    setLoading(false)
                })
            }
            catch (err) {
                console.log(err);
            }
        }
        // setTimeout(function() { fetchDailyData() }, 5000);  <- used to make sure loading data message / switch to graph data works correctly
        fetchDailyData();
    }, [])

    useEffect(() => {
        console.log("Change in daily data: ", dailyData);
    }, [dailyData])

    const pieChart = (
        <Pie
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        data: [positive, recovered, death],
                        backgroundColor: ["rgba(138, 216, 121, 0.9)", "rgba(90, 207, 201, 0.9)", "rgba(243, 83, 58, 0.9)"]
                    }
                ]
            }}
            options={{
                legend: {display: true},
                title: {display: true, text:"Data Visualization of 56 US States and Territories"}
            }}
        />
    )

    const lineChart = (
        <Line 
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ positive }) => positive),
                        label: "Positive Cases",
                        backgroundColor: "rgb(206, 255, 195)",
                        borderColor: "#006400",
                        fill: '+1',
                    },
                    {
                        data: dailyData.map(({ recovered }) => recovered),
                        label: "Recovered Cases",
                        backgroundColor: "rgb(190, 245, 242)",
                        borderColor: "#008ecc",
                        fill: '+1',
                    },
                    {
                        data: dailyData.map(({ death }) => death),
                        label: "Deaths",
                        backgroundColor: "rgb(252, 208, 202)",
                        borderColor: "red",
                        fill: true,
                    }
                ]
            }}
            options={{
                title: {display: true, text:"Data Visualization of 56 US States/Territories from January 22nd, 2020 to Present"}
            }}
        />
    )

    return (
        <div className={styles.container}>
            {loading && <p>Graph is loading...</p>}
            {positive && pieChart}
            {dailyData.length !== 0 && lineChart}
        </div>

    )
}

export default Chart
