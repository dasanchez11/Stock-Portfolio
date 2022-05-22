import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import { useEffect, useState } from "react";
import { colors } from "../utils/colors";



const BigChart = ({stockData,ticker}) => {
    const labels = stockData.labels;
    const [trend,setTrend] = useState('default')

    useEffect(()=>{
      if(stockData){
        setTrend(stockData.close[0]<stockData?.close[stockData.close.length-1] ? 'positive' : 'negative');

      }
    },[stockData])

    const data = {
      labels: labels,
      datasets: [{
        label: ticker.toUpperCase(),
        data: stockData.close,
        fill: true,
        backgroundColor: colors[trend].bg,
        borderColor: colors[trend].border,
        tension: 0.1
      }]
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        title:{
          align:'center',
          display:true,
          text:ticker.toUpperCase()
        },
          tooltip: {
              enabled: true
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
  
  export default BigChart