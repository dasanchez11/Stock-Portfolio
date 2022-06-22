import React, {useEffect,useState } from 'react'
import {useSelector} from 'react-redux'
import {getStock} from '../../api/api'
import { RootState } from '../../redux/store'
import BigChart from './BigChart.component'

export type GraphData = {
  close:number[];
  labels:string[]
}

const SpecificStock = () => {
    const tickerName = useSelector((state:RootState)=>state.mainContent.stock)
    const [interval,setInterval] = useState('1day')
    const [stockData,setStockData] = useState<GraphData>({close:[],labels:[]})

      useEffect(() => {
        const getCurrency = async () => {
          try {
            let dat:number[]=[]
            let lab:string[]=[]
            const response = await getStock(tickerName,interval)
              response.data.data.forEach((item:{close:number,datetime:string})=>{   
                  dat.unshift(item.close)
                  lab.unshift(item.datetime)
                     
            })
            setStockData({close:dat,labels:lab})
            
          } catch (err) {
            console.error(err);
          }
          };

        getCurrency()
      }, [tickerName,interval,setStockData]);

      const handleClick= (e:React.MouseEvent<HTMLLIElement>) =>{
          e.preventDefault()
          setInterval((e.target as HTMLLIElement).id)

      }

  return (
      <div className='w-full flex flex-col items-stretch h-full'>
            <div>
                <ul className='flex flex-row ml-3 text-green-600 text-xs'>
                    <li onClick={handleClick} className={`cursor-pointer border border-green-600 rounded-sm px-3 ${interval==='1h'? 'text-white bg-green-600': ''}`} id='1h'>1h</li>
                    <li onClick={handleClick} className={`cursor-pointer border border-green-600 rounded-sm px-3 ${interval==='4h'? 'text-white bg-green-600': ''}`} id='4h'>4h</li>
                    <li onClick={handleClick} className={`cursor-pointer border border-green-600 rounded-sm px-3 ${interval==='1day'? 'text-white bg-green-600': ''}`} id='1day'>1d</li>
                    <li onClick={handleClick} className={`cursor-pointer border border-green-600 rounded-sm px-3 ${interval==='1week'? 'text-white bg-green-600': ''}`} id='1week'>1w</li>
                    <li onClick={handleClick} className={`cursor-pointer border border-green-600 rounded-sm px-3 ${interval==='1month'? 'text-white bg-green-600': ''}`} id='1month'>1m</li>
                </ul>
            </div>
            <div className='h-full w-full'>
                <BigChart stockData={stockData} ticker={tickerName}/>
            </div>
      </div>
  )
}

export default SpecificStock