import axios from "axios"
import convertState from "./convertState"

const API_US = 'https://covidtracking.com/api/us'; // current total US data
const API_US_DAILY = 'https://covidtracking.com/api/us/daily' // all the daily US data compiled from the start of the API to current
const API_STATES = "https://covidtracking.com/api/states" // current total data for each US state + territory
const API_STATES_DAILY = "https://covidtracking.com/api/states/daily" // all the daily data for each US state + territory

// retrieves the positive cases, recovered cases, total deaths, and last time of update from the API
// the API returns a response array of length 1, where the only element is an object containing all the data
// destructure the json object
// the return of this function will be an object of the key/values we want to set the state to in App.js 
const fetchData = async () => {
    try {
        const data = await axios.get(API_US).then(response => {
            const responseObject = response.data[0];
            const { dateChecked, positive, recovered, death } = responseObject;
            return { fullName: "United States", dateChecked, positive, recovered, death };
        })
        
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

// retrieves an ARRAY of positive cases, recovered cases, total deaths, and last time of update from the API
// create a new array of destructured data using .map()
// the date.substring() is to remove the timezone from the json string so the date is in year-month-date format
// mapped array is reverse() because the json array object's values were in reverse chronological order
const fetchDailyData = async () => {
    try {
        const dailyData = await axios.get(API_US_DAILY).then(response => {
            const responseObject = response.data;
            const mappedDailyObject = responseObject.map(data => ({
                dateChecked: data.dateChecked.substring(0, 10),
                dailyPositive: data.positive,
                dailyRecovered: data.recovered,
                dailyDeath: data.death,
            }))
            const reverseDailyObject = mappedDailyObject.reverse();
            return reverseDailyObject;
        })

        return dailyData;
    }
    catch (err) {
        console.log(err);
    }
}

// retrieves an ARRAY of objects of all the US states and territories
// extract the state abbreviation, state full name, positive cases, recovered cases, total deaths into a new array 
// API json only returns the state abbrevation so a function is created to do the abbrevation to full name conversion
const fetchStates = async (state) => {
    try {
        const statesData = await axios.get(API_STATES).then(response => {
            const mappedStates = response.data.map(data => ({
                stateAbbrev: data.state,    
                fullName: convertState(data.state),
                dateChecked: data.dateChecked.substring(0, 10),
                positive: data.positive,
                recovered: data.recovered,
                death: data.death,
            }))
            if (state === undefined) {
                return mappedStates
            } else {
                const filteredState = mappedStates.filter(data => data.fullName === state)
                const { stateAbbrev, fullName, dateChecked, positive, recovered, death } = filteredState[0]
                return { stateAbbrev, fullName, dateChecked, positive, recovered, death };
            }
        })

        return statesData;
    }
    catch (err) {
        console.log(err)
    }
}

// retrieves an ARRAY of objects of every single US state and territory daily data from when the API started tracking data
// filter the JSON response to only get an array that consists of the daily data for the specific state passed in as parameter
// extract the state abbreviation, positive cases, recovered cases, total deaths, and date last updated into a new array 
// create a new array of destructured data using .map()
// mapped array is reverse() because the json array object's values were in reverse chronological order
const fetchStatesDaily = async (state) => {
    try {
        const dailyStatesData = await axios.get(API_STATES_DAILY).then(response => {
            const filteredState = response.data.filter(data => convertState(data.state) === state)
            const mappedState = filteredState.map(data => ({
                dateChecked: data.dateChecked === null ? null : data.dateChecked.substring(0, 10),
                stateAbbrev: data.state,
                dailyPositive: data.positive,
                dailyRecovered: data.recovered,
                dailyDeath: data.death,
            }))
            const reverseDailyState = mappedState.reverse();
            return reverseDailyState;
        })

        return dailyStatesData
    }
    catch (err) {
        console.log(err)
    }
}

export { fetchData, fetchDailyData, fetchStates, fetchStatesDaily }