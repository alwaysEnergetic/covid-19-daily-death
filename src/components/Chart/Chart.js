import  React, { useState, useEffect } from 'react'
import { Line, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css"
import { fetchDailyData } from "../../api/index"

// destructure the data state being passed in so we can call positive, recovered, and death directly
function Chart({data: {positive, recovered, death} }) {
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true); // used to render a loading graph message for the line chart if the dailyData is not updated yet

    useEffect(() => {
        // setTimeout(function() { fetchDailyData() }, 5000);  <- used to make sure loading data message / switch to graph data works correctly
        const retrieval = async () => {
            setDailyData(await fetchDailyData())
            setLoading(false)
        }
        retrieval()
    }, [])

    // debugging useEffect right now to check that dailyData has been updated
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
                        label: "Infected",
                        backgroundColor: "rgb(206, 255, 195)",
                        borderColor: "#006400",
                        fill: '+1',
                    },
                    {
                        data: dailyData.map(({ recovered }) => recovered),
                        label: "Recovered",
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
            {dailyData.length && lineChart}
        </div>

    )
}

export default Chart
