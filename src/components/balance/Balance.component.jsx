import React from 'react'
import {FiMoreHorizontal} from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { balanceCalculations,roundNum } from '../utils/functions'
import {MdArrowDropUp,MdArrowDropDown} from 'react-icons/md'

const Balance = () => {
    const data = useSelector(state=>state.portfolio.data)
    // const data = []
    const currentMoney = roundNum(balanceCalculations(data,'price'))
    const investedMoney = roundNum((balanceCalculations(data,'entryPrice')))
    const returnsPercent = roundNum((currentMoney/investedMoney)-1)
    const returnsPos = returnsPercent>0 ? true : false
  return (
    <section className='text-white'>
        <div className='flex flex-row items-center justify-between mx-3'>
            <h3>Balance</h3>
            <p className='right-2 top-2 hover:bg-white/40 rounded-full cursor-pointer'><FiMoreHorizontal/></p>
        </div>
        <div className='bg-gray-700 mx-5 flex flex-col items-center rounded-full p-3 text-2xl'>
            <h1>${currentMoney}</h1>
        </div>
        <div className='mt-4'>
            <div className='mx-3 my-2'>
                <h5>Invested</h5>
                <div className='flex flex-row items-center justify-between'>
                    <h3 className='text-lg'>$ {investedMoney}</h3>
                    <h5 className={`text-4xl ${ returnsPos ? 'text-green-500' : 'text-red-600' }`}> { returnsPos ? <MdArrowDropUp/> : <MdArrowDropDown/>  }</h5>
                </div>
            </div>

            <div className='mx-3 my-2'>
                <h5>{returnsPos ? 'Gains' : 'Losses'}</h5>
                <div className={`flex flex-row items-center justify-between`}>
                    <h3 className={`text-lg`}>${Math.abs(roundNum(investedMoney-currentMoney))}</h3>
                    <h5 className={`text-base ${ returnsPos ? 'text-green-500' : 'text-red-600' }`}>{roundNum(returnsPercent*100)}%</h5>

                </div>
            </div>


        </div>
    </section>
  )
}

export default Balance