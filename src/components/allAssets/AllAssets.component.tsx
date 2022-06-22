import React from 'react'
import Donught from '../donught/Donught.component'
import { useSelector } from 'react-redux'
import {getCategories, categoriesDistribution } from '../utils/functions';
import { RootState } from '../../redux/store';



const AllAssets:React.FC = () => {
    const data = useSelector((state:RootState)=>state.portfolio.data)
    const categories = getCategories(data)
    const distribution = categoriesDistribution(data,categories,true)
   
 

  return (
    <div className='h-full w-full'>
      <Donught distribution={distribution}/>
    </div>
  )
}

export default AllAssets