import React from 'react'
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import { chartColors } from "../utils/colors";



const Donught:React.FC<{distribution:any}> = ({distribution}) => {
    const graphData = {
        maintainAspectRatio: false,
        responsive: false,
        labels: Object.keys(distribution),
        datasets: [
          {
            data: Object.values(distribution),
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
          }
        ]
      };
    

  return (
    <div className="chart-container relative h-full w-full">
        <Doughnut  data={graphData}/>
  </div>
  )
}

export default Donught