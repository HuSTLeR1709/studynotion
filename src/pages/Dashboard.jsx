import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'


const Dashboard = () => {
    const {loading: authLoading} = useSelector((state)=> state.auth)
    const {loading: profileLoading} = useSelector((state)=> state.profile)
    
    if(authLoading || profileLoading){
        return <div className='mt-10'>
            Loading...
        </div>
    }
  return (

    <div className='flex relative max-h-[100vh]'>
        <Sidebar/>
        <div className='max-h-[90vh] overflow-auto flex justify-center w-11/12'>
            <div className='w-11/12 mx-auto py-10 max-w-[1000px] '>
                <Outlet/>
            </div>
        </div>
    </div>
    
    
  )
}

export default Dashboard