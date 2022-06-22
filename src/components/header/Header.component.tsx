import React from 'react'
import {FaWallet} from 'react-icons/fa'
import {BsArrowRight} from 'react-icons/bs'

const Header:React.FC = () => {
  return (
    <section id='home' className='relative h-[140vh] lg:h-[85vh] w-full pt-[80px] bg-neutral-900 text-white flex flex-col items-center'>
       <div className='flex flex-col mt-20 mx-5 gap-5 lg:flex-row items-center w-[90vw] md:w-[70vw] lg:w-[95vw]'>
           <div className='lg:w-1/2 h-[50vh] flex flex-col gap-8 mx-3'>
               <h1 className='text-3xl md:text-5xl '>Platform to manage your Money, Cryptos and Investment Portfolio</h1>
               <h4 className='text-2sm md:text-1xl text-zinc-600'>We will help you to manage your portfolio allocation and returns, within all you assets</h4>
               <div className='flex gap-4 items-center'>
                   <button className=' bg-green-600 px-3 py-2 rounded-full'>Get Started</button>
                   <a href='#services' className='flex flex-row items-center gap-3 cursor-pointer'>
                    <div className=' '>How it works</div>
                    <BsArrowRight/>
                   </a>
               </div>
           </div>
           <div className='relative lg:w-1/2 h-[50vh] w-full'>
               <div className='absolute top-[-10px] z-10 lg:left-[-10px] left-0  bg-black/20  w-[15rem] flex flex-row items-center gap-2 rounded-md p-3 m-2'>
                   <div className='h-12 w-12 bg-green-600 rounded-md flex items-center'>
                     <FaWallet className='text-center m-auto' />
                   </div>
                   <div>
                       <h4>$5,000,000</h4>
                       <p>Total Balance in Account</p>
                   </div>
               </div>

               <div className='absolute h-full z-0 w-full lg:right-0 lg:top-0 rounded-tl-full rounded-bl-full bg-gray-300 '>
                   
               </div>

               <div className='absolute bottom-[-90px] flex flex-col bg-black/20  w-[20rem] h-[8rem] items-center gap-2 rounded-md p-3 m-2 '>
                   <div className='h-10 w-10 bg-green-600 rounded-md flex items-center'>
                     <FaWallet className='text-center m-auto' />
                   </div>
                   <div>
                       <h4 className='text-center'>50% Return</h4>
                       <p className='text-center'>Total Return on current assets</p>
                   </div>
               </div>
               
           </div>
       </div>
    </section>
  )
}

export default Header