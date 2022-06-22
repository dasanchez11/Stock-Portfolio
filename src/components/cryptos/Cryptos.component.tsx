import React from 'react'
import Donught from '../donught/Donught.component';
import { useSelector } from 'react-redux'
import { filterAssets,calculateValue} from '../utils/functions';
import { RootState } from '../../redux/store';


const Cryptos:React.FC = () => {
  const type = useSelector((state:RootState)=>state.mainContent.active)
  const data = useSelector((state:RootState)=>state.portfolio.data)
  const stocks = filterAssets(data,type,'typeOfAsset')
  const distribution = calculateValue(stocks)

  return (
    <div className='h-full w-full'>
      <Donught distribution={distribution}/>
    </div>
  )
}

export default Cryptos