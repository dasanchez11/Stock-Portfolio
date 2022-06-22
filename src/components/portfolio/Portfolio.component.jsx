import React, { useEffect, useState } from 'react';
import {FiSearch} from 'react-icons/fi';

import {AiOutlineClose} from 'react-icons/ai';

import StockCard from './stockCard/StockCard.component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioAsync } from '../../redux/portoflio/portfolio.actions';
import { uniqueArrayElements } from '../utils/functions';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch,useAppSelector } from '../../hooks/hooks';


const Portfolio = () => {
    const [search,setSearch] = useState(false)
    const [activeSearch,setActiveSearch] = useState('')
    
    const data = useAppSelector(state =>state.portfolio.data)
    const displayData = uniqueArrayElements(data)

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchPortfolioAsync())

    },[dispatch])

 
  
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setActiveSearch(e.target.value)
    }

    const handleSearchClick = () =>{
        setSearch(!search)
        setActiveSearch('')
    }

  return (
    <section className='text-white'>
       <div className='relative text-2xl flex flex-row items-center justify-between mx-5 p-4'>
           <h5>Portfolio</h5>
           
           {!search ? <p className='text-green-600 cursor-pointer' onClick={handleSearchClick}><FiSearch/></p> : (
           <div className='absolute duration-500 flex flex-row items-center right-0 '>
               <input onChange={handleChange} className='w-32 text-sm pr-3 rounded-md bg-gray-800  placeholder:text-green-600 text-green-600 outline-none py-1 px-3 selection:bg-white/70' placeholder='Search a stock'></input>
               <p className='text-green-600  cursor-pointer' onClick={handleSearchClick} ><AiOutlineClose/></p>

           </div>
           )}
       </div>
       <div className='grid grid-cols-1  lg:grid-cols-3 gap-5 mx-5 overflow-y-scroll '>
            {displayData.filter(item=>item.name.toLowerCase().includes(activeSearch)||item.ticker.toLowerCase().includes(activeSearch))
            .map((item,idx)=>{
                return <StockCard key={uuidv4()} data={[item.name,item.price,item.ticker,item.typeOfAsset,item.name_alpha]}/>
                
            })
            
            }
       </div>
    </section>
  )
}

export default Portfolio