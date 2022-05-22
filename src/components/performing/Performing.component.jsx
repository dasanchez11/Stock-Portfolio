import React from 'react'
import {AiFillCaretDown} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { activateSpecificStock } from '../../redux/mainContent/mainContent.actions'

const MockData = [
  ['TSLA',0.368],
  ['AAPL',0.531],
  ['XIAC',0.152],
  ['NIO',0.102],
  ['MANA',0.123]
]

const Performing = () => {
  const dispatch = useDispatch();
  return (
    <section className='relative text-white p-3'>
      <div className='flex flex-row justify-between border-b-2 border-white'>
        <h1>Performing</h1>
        <div className='flex flex-row items-center text-sm'>
          <p className=''>DropDown</p>
          <AiFillCaretDown className='pt-1'/>
        </div>
      </div>

     

      {MockData.map((item,idx)=>{

          let number = (item[1]*100).toString()[0]
        
          const color = {
            1:'bg-yellow-100/60',
            2:'bg-yellow-200/60',
            3:'bg-yellow-300/60',
            4:'bg-yellow-400/60',
            5:'bg-yellow-500/60',
            6:'bg-yellow-600/60',
            7:'bg-yellow-700/60',
            8:'bg-yellow-800/60',
            9:'bg-yellow-900/60'
          }

          if(number>9){
            number = 9
          }
          let widthNum = item[1]*100
          if(widthNum<20){
            widthNum = 20
          }
          let width = widthNum.toString() + '%'

        return (
          <div onClick={()=>dispatch(activateSpecificStock(item[0]))} key={idx} style={{'width':width, 'minWidth':'120px'}} className={`relative ${color[number]} text-sm my-2 h-12 rounded-full flex flex-row items-center justify-between px-4 gap-2 cursor-pointer`}>
            <span>{item[0]}</span>
           <span>{item[1]*100 + '%'}</span>
          </div>
        )
      })}
      
    </section>
  )
}

export default Performing