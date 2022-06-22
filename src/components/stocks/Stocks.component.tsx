import React from 'react'
import Donught from '../donught/Donught.component'
import { filterCommonStocksOthers,calculateValue} from '../utils/functions';
import { useAppSelector } from '../../hooks/hooks';

const Stocks = () => {
  const type = useAppSelector(state=>state.mainContent.active)
  const data = useAppSelector(state=>state.portfolio.data)
  const stocks = filterCommonStocksOthers(data,type,'typeOfAsset')
  const distribution = calculateValue(stocks)
  
  return (
    <div className='h-full w-full'>
      <Donught distribution={distribution}/>
    </div>
  )
}

export default Stocks