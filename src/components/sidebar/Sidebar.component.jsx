import React, {useState} from 'react'
import {BsHexagonFill,BsFillArrowRightCircleFill} from 'react-icons/bs'
import {AiFillPieChart,AiOutlineStock} from 'react-icons/ai'
import {SiBitcoinsv} from 'react-icons/si'
import {FaPercentage} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { activateSidebar} from '../../redux/mainContent/mainContent.actions'
import {GoSignOut} from 'react-icons/go'
import { signOut } from '../../redux/user/user.actions'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const [sideOpen,setSideOpen] = useState(false)
    const active = useSelector(state=>state.mainContent.active)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(state=>state.user.name)


    const handleClick = (e) =>{
        e.preventDefault()
        const result = e.target.closest("DIV").getAttribute('name')
        dispatch(activateSidebar(result))
    }

    const signOutClick = () =>{
        dispatch(signOut())
        navigate('/')
    }
  return (
    <div className={`${sideOpen ? 'w-72' : 'w-20'} p-5 pt-8 duration-300 h-screen bg-gray-600 relative z-10`}>
        <BsFillArrowRightCircleFill  className={`absolute cursor-pointer -right-3 top-9 w-7 text-2xl text-white rounded-full ${sideOpen ? 'rotate-180 duration-200':''}`} onClick={()=>setSideOpen(!sideOpen)}/>
        <div className='flex gap-x-4 items-center '>
            <div className={`cursor-pointer duration-500 `}><BsHexagonFill className='text-green-600 text-3xl'/></div>
            <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!sideOpen && "scale-0"}`} >
            {name}
          </h1>
        </div>

        <div className={`mt-32 py-3 pl-2 flex gap-x-4 items-center cursor-pointer hover:text-white  ${active==='assets' ? 'border-r-4 border-green-600 pr-12 text-green-600':'text-gray-700'}`} name='assets' onClick={handleClick}>
            <p><AiFillPieChart className={`text-3xl`}/></p>
            <h1 className={`origin-left font-medium text-xl duration-200 ${!sideOpen && "scale-0 "}`} >
                Assets
            </h1>
        </div>

        <div className={`mt-3 py-3 pl-2 flex gap-x-4 items-center cursor-pointer hover:text-white  ${active==='crypto' ? 'border-r-4 border-green-600 pr-12 text-green-600':'text-gray-700'}`} name='crypto' onClick={handleClick}>
            <p><SiBitcoinsv className={`text-3xl`}/></p>
            <h1 className={`origin-left font-medium text-xl duration-200 ${!sideOpen && "scale-0 "}`} >
                Crypto
            </h1>
        </div>

        <div className={`mt-3 py-3 pl-2 flex gap-x-4 items-center cursor-pointer hover:text-white  ${active==='stock' ? 'border-r-4 border-green-600 pr-12 text-green-600':'text-gray-700'}`} name='stock' onClick={handleClick}>
            <p><AiOutlineStock className={`text-3xl`}/></p>
            <h1 className={`origin-left font-medium text-xl duration-200 ${!sideOpen && "scale-0 "}`} >
                Stock
            </h1>
        </div>

        <div className={`mt-3 py-3 pl-2 flex gap-x-4 items-center cursor-pointer hover:text-white  ${active==='returns' ? 'border-r-4 border-green-600 pr-12 text-green-600':'text-gray-700'}`} name='returns' onClick={handleClick}>
            <p><FaPercentage className={`text-3xl`}/></p>
            <h1 className={`origin-left font-medium text-xl duration-200 ${!sideOpen && "scale-0 "}`} >
                Returns
            </h1>
        </div>


        <div className={`mt-40 py-3 pl-2 flex gap-x-4 items-center cursor-pointer hover:text-white text-gray-700`} name='returns' onClick={signOutClick}>
            <p><GoSignOut className={`text-3xl`}/></p>
            <h1 className={`origin-left font-medium text-xl duration-200 ${!sideOpen && "scale-0 "}`} >
                SignOut
            </h1>
        </div>
    </div>
  )
}

export default Sidebar