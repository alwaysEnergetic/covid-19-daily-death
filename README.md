# COVID-19 Tracker in United States

Live Site (deployed on Heroku): https://covid19-us-tracker-visual.herokuapp.com/

## Important Notices

- This project only has data up to March 7th, 2021. See The COVID Tracking Project's statement below.
  ![COVID Tracking Project API Deprecation Notice](/src/images/deprecatedCOVID.png)
- The recovered field is now deprecated and most US recovered values are `null`.
- CORS support for this API ended May 1, 2021 so I now use a node.js reverse proxy that adds CORS headers to the proxied requests, thanks to [cors-anywhere](https://github.com/Rob--W/cors-anywhere). This allows my React application to still be able to fetch and process the API response with JavaScript.

## Demo GIF (As of August 17th, 2020)

![COVID19 App GIF](./src/images/covid19Demo.gif)

## Description

A COVID-19 tracker that visualizes the statistics (total positive cases, recoveries, and deaths) of COVID-19 data in the United States provided by the [COVID Tracking Project API](https://covidtracking.com/data/api). This project will show the collective US data, the daily US data through a line chart, the collective data for each state, and the daily data for each state through a line chart. The API's US data is updated every day at 0:00 AM UTC (i.e. 5:00 PM PST). Each individual state data may not be updated every day.

Some states may have null values for some of their data, particularly a state's recovery number from COVID-19. In this case, I chose to update the data card for such null values with a '?' to indicate that it is unknown.

## COVID Tracking Project API

UPDATE: The COVID Tracking Project has a new API domain name and added new endpoints to extract current and historic values for a specific state. I replaced the old API endpoints with the new endpoints and the new ones still returned the same data so I did not have to make any logical changes in my code. There were the new endpoints to retrieve a specific state's values which would make my application faster because I currently have to make a call to get every state (and every single state's historic data for the daily chart) from the API and filter that response data value to extract just the state that I want to display, but I decided to let it be for now while I focus on other projects.

The documentation of the API used is linked [here](https://documenter.getpostman.com/view/8854915/SzS8rjHv?version=latest#dc323eaa-826d-4efc-bd3c-85d9d757477b).

I make a GET request to 'https://api.covidtracking.com/v1/us/current.json' to obtain the US Current data that I display on the data cards and the pie chart.
I make a GET request to 'https://api.covidtracking.com/v1/us/daily.json' to obtain the US daily information that I display on the line graph.  
I make a GET request to "https://api.covidtracking.com/v1/states/current.json" to populate the selector options menu of states and to display any specific chosen state to the data cards and the pie chart.
I make a GET request to "https://api.covidtracking.com/v1/states/daily.json" to obtain the daily information for any specific chosen state to display on the line graph.

## Running Project Locally

There is the live site of this application deployed on Heroku as displayed on one of the first few lines of this README, but if you would rather run this application locally, then do the following:

- First clone the project

```
git clone https://github.com/KennethNguyen/COVID19-US-tracker
```

- Then go into the cloned project directory

```
cd COVID19-US-tracker
```

- In the cloned project directory, install any required dependencies and then run the project

```
npm install
npm start
```

By default, npm start will tell you to navigate to localhost:3000 (or another local server if port 3000 is occupied) on your browser to see the application

## Utilized

- React
- @material-ui/core - React UI framework
  - View the official website [here](https://material-ui.com/)
- react-countup - React wrapper for CountUp.js
  - View the package [here](https://www.npmjs.com/package/react-countup)
- react-chartjs-2 - React wrapper for Chart.js
  - View the Github repo for react-chartjs-2 [here](https://github.com/jerairrest/react-chartjs-2) and the Chart.js library documentation [here](https://www.chartjs.org/docs/latest/).
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Color Palette

The color palette I chose for this project is called Popsicle from [this](https://digitalsynopsis.com/design/color-schemes-palettes-combinations/) post I found. It is number 37 on the list. This choice was inspired from the bold and vibrant red of the logo that I first found. Because of the logo, I knew I wanted to look for a similar vibrant red to reflect on the data of death cases to represent danger. I wanted to associate the data of recovered cases with a feeling of peace and safety, so I opted for a turquoise blue color as well. Finally I opted for a light green color to associate the number of positive cases with because I thought it reflects sickness and germs.

![Color Palette Image](./src/images/covid19-color-palette.png)

## Logo Credits

The coronavirus logo was taken from [York Graphic Designers](https://www.yorkgraphicdesigners.co.uk/coronavirus-covid-19-logo-design/). Check them out!

## Author

Kenneth Nguyen
