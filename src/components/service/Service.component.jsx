import React from 'react'
import {BsShieldFillCheck} from 'react-icons/bs'
import {AiTwotonePieChart,AiFillLock} from 'react-icons/ai'

const Service = () => {
  return (
    <section id='services' className=' relative w-full h-auto text-white mt-10 bg-neutral-900'>
        <h1 className='mx-3 text-center text-5xl font-bold my-10'>We provide Quality Service</h1>
        <h4 className='mx-3 text-center text-1xl text-gray-500'>We give you the best service so you can be up to date with your investments</h4>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3 my-10 mx-5'>
            <div className='flex flex-col gap-3 bg-neutral-800 p-6 shadow-md shadow-neutral-800 rounded-lg'>
                <div className='h-10 w-10 bg-green-600   rounded-full'>
                    <BsShieldFillCheck className='text-2xl m-auto h-full'/>
                </div>
                <h3 className='text-2xl'>Protect Information</h3>
                <p className='text-gray-500'>We will provide the best security stardards in the industry</p>
            </div>

            <div className='flex flex-col gap-3 bg-neutral-800 p-6 shadow-md shadow-neutral-800 rounded-lg'>
                <div className='h-10 w-10 bg-green-600   rounded-full'>
                    <AiTwotonePieChart className='text-2xl m-auto h-full'/>
                </div>
                <h3 className='text-2xl'>Easy to use</h3>
                <p className='text-gray-500'>We will provide the best security stardards in the industry</p>
            </div>

            <div className='flex flex-col gap-3 bg-neutral-800 p-6 shadow-md shadow-neutral-800 rounded-lg'>
                <div className='h-10 w-10 bg-green-600   rounded-full'>
                    <AiFillLock className='text-2xl m-auto h-full'/>
                </div>
                <h3 className='text-2xl'>Security First</h3>
                <p className='text-gray-500'>We will provide the best security stardards in the industry</p>
            </div>

           
        </div>
    </section>
  )
}

export default Service