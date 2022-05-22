import React from 'react'
import Balance from '../components/balance/Balance.component'
import Performing from '../components/performing/Performing.component'
import Portfolio from '../components/portfolio/Portfolio.component'
import Sidebar from '../components/sidebar/Sidebar.component'
import {useSelector} from 'react-redux'
import mainComponents from '../components/utils/utils.component'
import Modal from '../components/editStock/modal.component'
import SearchBar from '../components/searchBar/SearchBar.component'
import AddStock from '../components/addStock/addStock.component'



const Dashboard = () => {
    const display = useSelector(state=>state.mainContent.active)
    const modal = useSelector(state=>state.portfolio.modalActive)
    const addModal = useSelector(state=>state.portfolio.addModalActive)

    const CompName = mainComponents[`${display}`]

  return ( 
    <div className='relative flex flex-row w-full h-screen'>
        {modal && (<div>
            <Modal/>
        </div>)}
        {addModal && (<div>
            <AddStock/>
        </div>)}
        <div className='absolute'>
            <Sidebar/>
        </div>
        <div className='flex flex-col gap-3 ml-20 w-[100%]'>
            <div className=' text-white text-center mt-4'>
                <SearchBar/>
            </div>
            <div className='flex flex-col md:grid  overflow-x-scroll md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-4 w-full overflow-y-scroll'>
                <div className={`md:col-span-1 md:row-span-1 ${display === 'specificStock' ? 'w-[90%] h-[90%] md:w-[100%] md:h-[100%]' : display === 'returns' ? 'w-full h-full flex flex-col m-auto pl-3 justify-center' : 'w-[80%] md:w-[60%] lg:w-[40%] xl:w-[35%]'} lg:col-span-3 lg:row-span-2  text-white m-auto`}>
                    <CompName/>
                </div>
                <div className='h-50% m-3 md:row-start-2 md:col-start-1 lg:col-start-1 lg:col-span-3 lg:row-start-3 lg:row-span-2 min-h-[50%] overflow-y-scroll'>
                    <Portfolio/>
                </div>
                <div className='h-[50%] lg:col-start-4 lg:row-start-1 lg:row-span-2 m-3'>
                    <Performing />
                </div>
                <div className='h-[50%] m-3 md:col-start-2 md:row-start-2 lg:col-start-4 lg:row-start-3 lg:row-span-2'>
                    <Balance/>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default Dashboard