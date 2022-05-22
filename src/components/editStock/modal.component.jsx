import React,{ useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineClose} from 'react-icons/ai'
import {BiTrash} from 'react-icons/bi'
import {togglePortfolio} from '../../redux/portoflio/portfolio.actions'
import {removeStockPositionAsync,editStockAsync} from '../../redux/portoflio/portfolio.actions'



const Modal = () => {
    const tickerName = useSelector(state => state.mainContent.stockEdit)
    
    const data = useSelector(state=>state.portfolio.data)
    const dataResult = data.filter(item=> item.ticker === tickerName)
    
    
    const dispatch = useDispatch()
    const [changeInfo,setChangeInfo] = useState({id:{numOfShares:'',entryPrice:''}})

   

    const handleClickDelete = (e) =>{
        e.preventDefault()
        const id = e.target.closest("Button").getAttribute('id')
        dispatch(removeStockPositionAsync([id]))
        // dispatch(removeStockPosition([id]))
        if(dataResult.length===1){
            dispatch(togglePortfolio())
        }
        
    }

    const handleClickUpdate = (e) =>{
        e.preventDefault()
        const id = e.target.closest("Button").getAttribute('id')
        dispatch(editStockAsync(id,changeInfo[id]))
        dispatch(togglePortfolio())
    }

    const handleChange = (e) =>{
        const {name,value,id} = e.target
        setChangeInfo((prevState => ({
            [id]: {                   
                ...prevState[id],    
                [name]: value       
            }
        })))
        
    }


  return (
    <div className='bg-black bg-opacity-70 absolute inset-0 z-50 flex flex-col items-center justify-center '>
        <div className='relative h-[70vh] w-[60vw] bg-neutral-800 rounded-lg'>
            <AiOutlineClose onClick={()=>dispatch(togglePortfolio())} className='absolute right-3 top-2 text-green-600 cursor-pointer hover:bg-zinc-300 hover:rounded-full'/>
            <h1 className='text-center text-zinc-200 m-10 text-3xl'>
                {dataResult[0].name}
                </h1>
            <div className='mx-0 md:mx-4 lg:mx-10  overflow-x-scroll rounded-md max-h-[40vh] flex flex-col gap-4 items-center'>
                {dataResult.map(item=>{
                    return(
                        <form key={item._id} id={item._id} className='relative text-white border border-green-600 p-4 rounded-md w-[80%] md:w-[60%] flex flex-col items-center'>
                            <h3 className='absolute top-0 left-2 text-white text-xs sm:text-base'>03/20/22</h3>
                            <div className='w-[80%] text-xs sm:text-base text-center'>Entry Price</div>
                            <input id={item._id} autoComplete='off' name='entryPrice' onChange={handleChange} className='w-[80%] text-xs sm:text-base border-b-4 focus:text-white px-4 border-green-600 outline-none text-green-600 placeholder:bg-gray-500 placeholder:text-white bg-gray-500' placeholder={item.entryPrice}></input>
                            <div className='w-[80%] text-xs sm:text-base text-center'>Number of Shares</div>
                            <input id={item._id} autoComplete='off' name='numOfShares' onChange={handleChange} className='w-[80%] text-xs sm:text-base border-b-4 focus:text-white px-4 border-green-600 outline-none text-green-600 placeholder:bg-gray-500 placeholder:text-white bg-gray-500' placeholder={item.numOfShares}></input>
                            <div className='flex flex-row items-center justify-between w-full gap-1'>
                                <button onClick={handleClickUpdate} id={item._id} className=' cursor-pointer flex flex-row justify-center gap-2 items-center p-2 md:p-[0.9rem] mt-3 hover:bg-transparent hover:text-green-600 border border-green-600 bg-green-600 w-[50%] max-w-[8rem] text-xs text-center rounded-md hover:text-white hover:bg-green-600'>
                                    <div className='text-xs md:text-sm'>Edit</div>
                                </button>
                                <button onClick={handleClickDelete} id={item._id} className='  cursor-pointer flex flex-row justify-center gap-2 items-center p-2 mt-3 border border-green-600 w-[50%] max-w-[8rem] text-xs text-center rounded-md hover:text-white hover:bg-green-600'>
                                    <div className='hidden md:block'>Delete Position</div>
                                    <BiTrash className='text-lg text-center'/>
                                </button>
                            </div>
                        </form>
                    )
                })}
                
            </div>

        </div>
    </div>
  )
}

export default Modal