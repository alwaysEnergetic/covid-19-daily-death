import axios from "axios"

const API_US = 'https://covidtracking.com/api/us'; // current total US data
const API_DAILY = 'https://covidtracking.com/api/us/daily' // all the daily US data compiled from the start of the API to current

// retrieves the positive cases, recovered cases, total deaths, and last time of update from the API
// the API returns a response array of length 1, where the only element is an object containing all the data
// destructure the json object
// the return of this function will be an object of the key/values we want to set the state to in App.js 
const fetchData = async () => {
    try {
        const data = await axios.get(API_US).then(response => {
            const responseObject = response.data[0];
            const { dateChecked, positive, recovered, death } = responseObject;
            return { dateChecked, positive, recovered, death };
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
        const dailyData = await axios.get(API_DAILY).then(response => {
            const responseObject = response.data;
            const mappedDailyObject = responseObject.map(data => ({
                date: data.dateChecked.substring(0, 10),
                positive: data.positive,
                recovered: data.recovered,
                death: data.death,
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


export { fetchData, fetchDailyData }