import React from 'react'
import { roundNum,balanceCalculations } from '../utils/functions'
import { v4 as uuidv4 } from 'uuid';
import {useAppSelector } from '../../hooks/hooks';



const Returns = () => {
  const data = useAppSelector(state=>state.portfolio.data)


  const currentMoney = roundNum(balanceCalculations(data,'price'))
  const investedMoney = roundNum((balanceCalculations(data,'entryPrice')))
  const returnsPercent = roundNum((currentMoney/investedMoney)-1)

  return (
    <div className='w-full m-flex flex-col items-center justify-center'>
      {!data ? <div> No Data Available </div>: (
      <>
     
      <table className="w-[90%] table-fixed font-thin border-t border-b border-green-500 text-left m-3">
          <thead>
            <tr className='text-sm font-bold'>
              <td className=' md:hidden hidden'>Name</td>
              <td >Ticker</td>
              <td className='lg:table-cell md:hidden sm:hidden hidden'>Shares</td>
              <td className=' md:inline-block hidden '>Price</td>
              <td>Return</td>
            </tr>
          </thead>
          <tbody>
            {data.map(item=>{
              return(
                 <tr key={uuidv4()}>
                  <td className='text-xs text-left md:hidden hidden'>{item.name}</td>
                  <td className='text-sm'>{item.ticker}</td>
                  <td className='text-sm  lg:table-cell md:hidden hidden '> {roundNum(item.numOfShares)}</td>
                  <td className='md:block hidden '>$ {roundNum(item.price)}</td>
                  <td className=''>{roundNum(((item.price/item.entryPrice)-1)*100)}%</td>
                </tr>    
                
              )
            })}
            
            
          </tbody>
        </table>
        <table className="w-[90%] table-fixed font-thin border-t border-b border-green-500 text-left m-3">
          <thead>
              <tr className='text-sm font-bold'>
                <td className=' md:hidden hidden'>Name</td>
                <td >Total</td>
                <td className='lg:table-cell md:hidden sm:hidden hidden'></td>
                <td className=' md:inline-block hidden '></td>
                <td>{roundNum(returnsPercent*100)}%</td>
              </tr>
          </thead>
        </table>
        </>)}

    </div>
  )
}

export default Returns