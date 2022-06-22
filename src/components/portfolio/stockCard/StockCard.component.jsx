import React from 'react'
import {FiMoreHorizontal} from 'react-icons/fi';
import SmalChart from '../chart/SmalChart.component';
import { useDispatch,useSelector } from 'react-redux';
import Flag from 'react-world-flags'
import Icon from '../../Icon/icon'
import { Stock } from '../../../redux/mainContent/mainContent.types';
import { activateSpecificStock, activateStockEdit } from '../../../redux/mainContent/mainContent.actions';
import { togglePortfolio } from '../../../redux/portoflio/portfolio.actions';
import { graphDataTrend, prepareDataToGraph } from '../../utils/functions';
import { useAppDispatch,useAppSelector } from '../../../hooks/hooks';

const StockCard = ({data}) => {
  const price = data[1]
  const ticker = data[2]
  const type = data[3]
  const name_alpha = data[4]

 
  let graphData = useAppSelector(state=>state.portfolio.histData[ticker].values)
  graphData = prepareDataToGraph(graphData)
  const trend = graphDataTrend(graphData)


  const handleClickView = (e) =>{
    const val = e.target.closest("object")?.getAttribute('name')
    if(val){

      dispatch(activateSpecificStock(val))
    }
    
}
  

  const handleClickDot = (e) =>{
    // setEdit(e.target.closest("DIV").getAttribute('name'))
    dispatch(activateStockEdit(ticker))
    dispatch(togglePortfolio())
}

  const dispatch = useDispatch();

  return (
    <object name={ticker.toLowerCase()} className='relative flex flex-row h-20 gap-1 justify-center mx-8 sm:mx-10 lg:m-0 lg:justify-between p-2 items-center bg-neutral-800 rounded-lg'>
            <p onClick={handleClickView} className='text-green-600 p-[0.15rem] absolute left-2 top-1 hover:bg-green-600 hover:text-white rounded-lg cursor-pointer text-[0.5rem] border border-green-600'>view</p>
            <p onClick={handleClickDot} className='absolute right-2 top-1 hover:bg-white/40 rounded-full cursor-pointer'><FiMoreHorizontal/></p>
            <div className='mt-2 w-[20%] flex flex-row items-center justify-center'>
              {type.toLowerCase() === 'crypto' ? <Icon name={name_alpha.toLowerCase()} height="25" onCompleted='' onError=''/> :
                  <Flag code={name_alpha} width="30"/>}

            </div>

            <div className='flex flex-col gap-1 items-center justify-center w-[30%]'>
                <h2 className='text-bold '>{type.toLowerCase() === 'crypto' ? ticker.split("/")[0].toUpperCase() : ticker.toUpperCase() }</h2>
                <p className='text-sm text-gray-600'> $ {Math.round(price * 100) / 100}</p>
            </div>
            <div className='w-[25%] md:w-[40%]  flex flex-row items-center justify-center'>
                <SmalChart graphData={graphData} trend={trend} ticker={ticker} />
            </div>
    </object>
  )
}

export default StockCard
