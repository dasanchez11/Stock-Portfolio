import React from 'react'
import Donught from '../donught/Donught.component';
import { useSelector } from 'react-redux'
import { filterAssets,calculateValue} from '../utils/functions';


const Cryptos = () => {
  const type = useSelector(state=>state.mainContent.active)
  const data = useSelector(state=>state.portfolio.data)
  const stocks = filterAssets(data,type,'typeOfAsset')
  const distribution = calculateValue(stocks)

  return (
    <div className='h-full w-full'>
      <Donught distribution={distribution}/>
    </div>
  )
}

export default Cryptos