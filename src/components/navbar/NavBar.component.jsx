import React from 'react'
import {BsHexagonFill} from 'react-icons/bs'
import {BiMenu, } from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';


const Navbar = () => {
    const [nav,setNav] = useState(false)

    const handleClick = () =>{
        setNav(!nav)
    }


  return (
    <div className='w-screen h-[80px] z-20 bg-neutral-900 fixed drop-shadow-lg text-white'>
        <div className='px-8 flex justify-between items-center w-full h-full'>
            <Link to="/" className='flex items-center gap-2'>
                <BsHexagonFill className='text-green-600'/>
                <div>Fintrack</div>
            </Link>

            
            <ul className='hidden md:flex gap-3  '>
                <li><a href='#home'>Home</a></li>
                <li><a href='#services'>Services</a></li>
                <li><a href='#about'>About</a></li>
                <li><a href='#features'>Features</a></li>
            </ul>
      

            <div className='hidden md:flex gap-2 '>
                <Link to="/signup" className='border border-green-600 px-3 py-2 rounded-xl hover:bg-green-600'>Register</Link>
                <Link to="/signin" className='bg-green-600 px-3 py-2 rounded-xl hover:bg-transparent border border-green-600'>Sign In</Link>
            </div> 

            <div className='md:hidden cursor-pointer' onClick={handleClick}>
                    {!nav? (<BiMenu className='text-3xl' onClick={handleClick}/>) : (<AiOutlineClose className='text-3xl' onClick={handleClick}/>
                    )}
            </div>
        </div>
        <ul className={`${!nav ?'hidden':'absolute bg-neutral-900 w-full h-screen px-8 flex flex-col gap-4 justify-center md:hidden'}`}>
                <li className=' border-b-2 border-green-600 w-full' >Home</li>
                <li className='border-b-2 border-green-600 w-full'>About</li>
                <li className='border-b-2 border-green-600 w-full'>Support</li>
                <li className='border-b-2 border-green-600 w-full'>Platform</li>
                <li className='border-b-2 border-green-600 w-full'>Pricing</li>
                <div className='flex flex-col my-4 gap-3'>
                
                <Link onClick={handleClick} to='/signup' className='border border-green-600 px-3 py-2 rounded-xl hover:bg-green-600'>Register</Link>
                <Link onClick={handleClick} to='/signin' className='border border-green-600 px-3 py-2 rounded-xl hover:bg-green-600'>Sign In</Link>
                </div>
            </ul>

        <Outlet/>

    </div>
  )
}

export default Navbar