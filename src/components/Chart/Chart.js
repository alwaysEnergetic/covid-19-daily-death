import React from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Line, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css";

// destructure the data state being passed in so we can call positive, recovered, and death directly
// dailyData not destructured so we can map out daily values
function Chart({ data: { fullName, positive, recovered, death }, dailyData }) {
  const mobile = useMediaQuery('(max-width:600px)');

  const pieChart = (
    <Pie
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            data: [positive, recovered, death],
            backgroundColor: [
              "rgba(138, 216, 121, 0.9)",
              "rgba(90, 207, 201, 0.9)",
              "rgba(243, 83, 58, 0.9)",
            ],
          },
        ],
      }}
      options={{
        legend: { display: true },
        title: {
          display: true,
          text: `Collective Data Visualization of ${fullName}`,
        },
      }}
    />
  );

  const lineChart = (
    <Line
      data={{
        labels: dailyData.map(({ dateChecked }) => dateChecked),
        datasets: [
          {
            data: dailyData.map(({ dailyPositive }) => dailyPositive),
            label: "Infected",
            backgroundColor: "rgb(206, 255, 195)",
            borderColor: "#006400",
            fill: "+1",
          },
          {
            data: dailyData.map(({ dailyRecovered }) => dailyRecovered),
            label: "Recovered",
            backgroundColor: "rgb(190, 245, 242)",
            borderColor: "#008ecc",
            fill: "+1",
          },
          {
            data: dailyData.map(({ dailyDeath }) => dailyDeath),
            label: "Deaths",
            backgroundColor: "rgb(252, 208, 202)",
            borderColor: "red",
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `Data Visualization of ${fullName} from first case(s) reported to present day`,
        },
        maintainAspectRatio: mobile ? false : true,
      }}
    />
  );

  // if the dailyData is undefined then we return that the lineChart is loading, same thing with positive and pieChart
  return (
    <div className={styles.container}>
      {dailyData === undefined && <p>Graph is loading...</p>}
      {positive && pieChart}
      {dailyData.length && lineChart}
    </div>
  );
}

export default Chart;
