import React from 'react'
import { Pie } from "react-chartjs-2";

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
                        backgroundColor: ["rgba(238,210,2, 0.75)", "rgba(0, 0, 255, 0.5)", "rgba(255, 0, 0, 0.5)"]
                    }
                ]
            }}
        />
    )

    return (
        <div>
            {pieChart}
        </div>
    )
}

export default Chart
