import React from 'react'
import { Pie } from "react-chartjs-2";
import styles from "./Chart.module.css"

// destructure the data state being passed in
function Chart({data: {positive, recovered, death} }) {
    if (!positive) {
        return ("Loading state...")
    }

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

    return (
        <div className={styles.container}>
            {pieChart}
        </div>
    )
}

export default Chart
