import React from 'react'
import CountUp from 'react-countup';

// destructure the data state being passed in
function DataCards({data: {positive, recovered, death} }) {
    // if the data is not yet fetched and loaded into state, return a loading message
    if (!positive) {
        return "Loading state..."
    }

    return (
        <div>
            <h2>Number of People Infected: <CountUp start={0} end={positive} duration={2} separator="," /> </h2>
            <h2>Number of People Recovered: <CountUp start={0} end={recovered} duration={2} separator="," /></h2>
            <h2>Total Deaths: <CountUp start={0} end={death} duration={2} separator="," /></h2>
        </div>
    )
}

export default DataCards
