# COVID-19 Tracker in United States

Live Site (deployed on Heroku): https://covid19-us-tracker-visual.herokuapp.com/

## Screenshot (As of August 11th, 2020)
![COVID19 App Screenshot](./src/images/exampleCOVID19.png)

## Description
A COVID-19 tracker that visualizes the statistics (total positive cases, recoveries, and deaths) of COVID-19 data in the United States provided by the [COVID Tracking Project API](https://covidtracking.com/data/api).

## COVID Tracking Project API
The documentation of the API used is linked [here](https://documenter.getpostman.com/view/8854915/SzS8rjHv?version=latest#dc323eaa-826d-4efc-bd3c-85d9d757477b). 

I make a GET request to 'http://covidtracking.com/api/us' to obtain the US Current data that I display on the data cards and the pie chart.
I make a GET request to 'http://covidtracking.com/api/us/daily' to obtain the US daily information that I display on the line graph.  

## Running Project Locally
There is the live site of this application deployed on Heroku as displayed on one of the first few lines of this README, but if you would rather run this application locally, then do the following:

* First clone the project
```
git clone https://github.com/KennethNguyen/COVID19-US-tracker
```

* Then go into the cloned project directory
```
cd COVID19-US-tracker
```

* In the cloned project directory, install any required dependencies and then run the project
```
npm install
npm start
```
By default, npm start will tell you to navigate to localhost:3000 (or another local server if port 3000 is occupied) on your browser to see the application

## Utilized
* @material-ui/core - React UI framework
    * View the official website [here](https://material-ui.com/)
* react-countup - React wrapper for CountUp.js
    * View the package [here](https://www.npmjs.com/package/react-countup)
* react-chartjs-2 - React wrapper for Chart.js
    * View the Github repo for react-chartjs-2 [here](https://github.com/jerairrest/react-chartjs-2) and the Chart.js library documentation [here](https://www.chartjs.org/docs/latest/).  
* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Color Palette 
The color palette I chose for this project is called Popsicle from [this](https://digitalsynopsis.com/design/color-schemes-palettes-combinations/) post I found. It is number 37 on the list. This choice was inspired from the bold and vibrant red of the logo that I first found. Because of the logo, I knew I wanted to look for a similar vibrant red to reflect on the data of death cases to represent danger. I wanted to associate the data of recovered cases with a feeling of peace and safety, so I opted for a turquoise blue color as well. Finally I opted for a light green color to associate the number of positive cases with because I thought it reflects sickness and germs.

![Color Palette Image](./src/images/covid19-color-palette.png)

## Logo Credits
The coronavirus logo was taken from [York Graphic Designers](https://www.yorkgraphicdesigners.co.uk/coronavirus-covid-19-logo-design/). Check them out!

## Backlog
* Options to view data of each individual state/territory
* ~~Line graph of daily COVID-19 statistics~~ 
    * The graph on small (devices) viewport is cluttered and needs the height to be adjusted
    * 
* % change counter for each data
* UI adjustments

## Author
Kenneth Nguyen
