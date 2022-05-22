import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

import React from 'react'
import { colors } from "../../utils/colors";



const SmalChart = ({graphData,trend,ticker}) => {
  const displayName = ticker.toUpperCase()
  const labels = graphData[1];
  const data = {
    labels: labels,
    datasets: [{
      label: displayName,
      data: graphData[0],
      fill: true,
      backgroundColor: colors[trend].bg,
      borderColor: colors[trend].border,
      tension: 0.1
    }]
  };


  const options = {
      elements:{
          point:{
              radius:0
          }
      },
      scales: {
          y: {
              display: false
          },
          x:{
              display:false
          }
      },
      plugins: {
          tooltip: {
              enabled: false
          },
              hover: {
                  mode: null
              },
          legend: {
            display: false,
          },
        },

    };


  return (
    <div className="chart-container relative h-full w-full">
        <Line  data={data} options={options}/>
    </div>


  )
}

export default SmalChart