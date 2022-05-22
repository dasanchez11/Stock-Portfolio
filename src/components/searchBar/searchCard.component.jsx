
import axios from 'axios'
import React, { useEffect } from 'react'
import Flag from 'react-world-flags'
import { activateStockAdd } from '../../redux/mainContent/mainContent.actions'
import Icon from '../Icon/icon'
import {useDispatch} from 'react-redux'
import { toggleAddToPortfolio } from '../../redux/portoflio/portfolio.actions'



const SearchCard = ({data,setValue,setClose}) => {
    const {name,name_alpha,symbol,type} = data
    const dispatch = useDispatch()
    const handleClick =(e) =>{
       const addData = {name:name,
                        info:{symbol,type,name_alpha}
                        }
       dispatch(activateStockAdd((addData)))
       setValue('')
       setClose(false)
       dispatch(toggleAddToPortfolio())

    }
    
  return (
    <li onClick={handleClick}>
        <div className='bg-neutral-800 rounded-sm cursor-pointer text-left p-2 hover:coursor-pointer hover:bg-neutral-500 group'>
            <h4 className='font-bold text-sm py-2'>
                {symbol}
            </h4>
            <div className='flex flex-row items-center gap-2 text-xs pb-1 text-gray-500 group-hover:text-white'>
                {type.toLowerCase() === 'crypto' ? <Icon className='fill-black' name={name_alpha.toLowerCase()}  height="25"/> :
                <Flag code={name_alpha} width="30"/>}

               
                
                <h5 className=''>{name.substring(0,18)}{name.length>18?'...':''}</h5>
            </div>
        </div>
    </li>
  )
}

export default SearchCard