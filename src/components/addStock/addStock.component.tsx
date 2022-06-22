import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useAppSelector,useAppDispatch } from '../../hooks/hooks'
import { addStockAsync, toggleAddToPortfolio } from '../../redux/portoflio/portfolio.actions'

const AddStock = () => {
    const [addValues,setAddValues] = useState({entryPrice:'',numOfShares:''})
    const dispatch = useAppDispatch()
    const [currentPrice,setCurrentPrice] = useState(false)
    const {symbol,type,name_alpha} = useAppSelector((state)=>state.mainContent.stockAddInfo)
    const name = useAppSelector((state)=>state.mainContent.stockAdd)

    const handleClickAdd = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const data ={name,ticker:symbol,typeOfAsset:type.toLowerCase(),addValues,name_alpha:name_alpha}
        dispatch(addStockAsync(data))
        dispatch(toggleAddToPortfolio())
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;
        setAddValues({...addValues,[name]:value})
    }


  return (
    <div className='bg-black bg-opacity-70 absolute inset-0 z-50 flex flex-col items-center justify-center '>
        <div className='relative h-[70vh] w-[60vw] bg-neutral-800/90 rounded-lg flex flex-col items-center'>
            <AiOutlineClose onClick={()=>dispatch(toggleAddToPortfolio())} className='absolute right-3 top-2 text-green-600 cursor-pointer hover:bg-zinc-300 hover:rounded-full'/>
            <h1 className='text-center text-zinc-200 m-10 text-xl'>
                <span className='font-light'>Add position of</span> <span className='font-bold'> {symbol?.toUpperCase()}</span>
            </h1>
        
            <form className='relative text-white border border-green-600 p-4 rounded-md w-[80%] md:w-[60%] flex flex-col items-center'>
                <div className='cursor-pointer absolute top-0 left-0 flex flex-row items-center text-xs'>
                    <input autoComplete='off' className='m-3 cursor-pointer'  type="checkbox" checked={currentPrice ? true:false} onChange={()=>setCurrentPrice(!currentPrice)}></input>
                    <h4>Current Price</h4>
                </div>
                <div className='w-[80%] text-xs sm:text-base text-center'>Entry Price</div>
                <input name='entryPrice' autoComplete='off' disabled={currentPrice} onChange={handleChange} className='w-[80%] disabled:bg-gray-800 disabled:border-gray-800 text-xs sm:text-base border-b-4 focus:text-white px-4 border-green-600 outline-none  placeholder:bg-gray-500 placeholder:text-white bg-gray-500' ></input>
                <div className='w-[80%] text-xs sm:text-base text-center'>Number of Shares</div>
                <input required autoComplete='off' name='numOfShares' onChange={handleChange} className='w-[80%] text-xs sm:text-base border-b-4 focus:text-white px-4 border-green-600 outline-none  placeholder:bg-gray-500 placeholder:text-white bg-gray-500' ></input>
                <div className='flex flex-row items-center justify-between w-full gap-1'>
                    <button onClick={handleClickAdd} className=' cursor-pointer flex flex-row justify-center gap-2 items-center p-2 md:p-[0.9rem] mt-3 hover:bg-transparent hover:text-green-600 border border-green-600 bg-green-600 w-[50%] max-w-[8rem] text-xs text-center rounded-md hover:text-white hover:bg-green-600'>
                        <div className='text-xs md:text-sm'>Add Position</div>
                    </button>
                
                </div>
            </form>
        </div>
    </div>

           
  )
}

export default AddStock