import React ,{useEffect, useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { searchStockFetch } from '../../api/api'

import SearchCard from './searchCard.component'
import { v4 as uuidv4 } from 'uuid';






const SearchBar = () => {
    const [value,setValue] = useState('')
    const [close,setClose] = useState(false)
    const [result,setResult] = useState([])




    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value
        setClose(true)
        setValue(val)
        if(val===''){
            setClose(false)
        }
    }

    useEffect(()=>{
        const  getResults = async(query:string) =>{
            if(query!==''){
                const response = await searchStockFetch(value)
                setResult(response.data.data)
            }
        }

        getResults(value)
    
    },[value])

    const closeClick = (e:React.MouseEvent<SVGElement>) =>{
        setValue("")
        setClose(false)
    }
  return (
    <div className='relative w-full flex flex-col items-center'>
        <div className='relative flex flex-row items-center justify-center w-[12rem] m-auto '>
            <input autoComplete='off' onChange={handleChange} value={value}  className={`w-full text:sm placeholder:text-sm rounded-full outline-none py-2 px-5 text-white placeholder:text-white bg-neutral-800`} name='search-stock' placeholder='Search for a stock'>
            </input> 
            { close ? <AiOutlineClose className='cursor-pointer absolute text-green-600 text-xl right-4 ' onClick={closeClick}/> :
                <FiSearch className=' absolute text-green-600 text-xl right-4 '/>}
        </div>
            {close && 
            <ul className='absolute w-[12rem] pt-[-5px] top-11 z-10 max-h-96 overflow-x-scroll '>
                {result.map(item=>{
                    return(<SearchCard key={uuidv4()} data={item} setValue={setValue} setClose={setClose}/>)
                })}
            </ul>
            }   
        
    </div>
  )
}

export default SearchBar