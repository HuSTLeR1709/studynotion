import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'


const Sidebar = () => {
    const {user, loading:profileLoading} = useSelector((state)=>state.profile)
    const {loading:authLoading} = useSelector((state)=> state.auth)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if(profileLoading  || authLoading){
        return <div>
            Loading...
        </div>
    }
  return (
    <div>
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3rem)] py-10 bg-richblack-800'>

    <div className='flex flex-col'>
        {
            sidebarLinks.map((link)=>{
                if( link.type && user.accountType !== link.type){
                    return null;
                }
                return <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            })
        }
    </div>

        <div className='mx-auto mt-6 mb-6 h-[1px] bg-richblack-400 w-10/12'></div>
        <div className='flex flex-col gap-3'>
            <SidebarLink
                link={{name:"Settings", path:"dashboard/settings" }}
                iconName="VscSettingsGear"

            />

            <button
            onClick={ () => setConfirmationModal({
                text1: "Are you Sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handeler: ()=> dispatch(logout(navigate)),
                btn2Handeler: ()=> setConfirmationModal(null),
            })}
            className='text-sm font-medium text-richblack-200'
            >
                <div className='flex items-center gap-x-3 ml-8 text-richblack-25'>
                        <VscSignOut className='text-lg'/>
                        <span>Log Out</span>

                </div>
            </button>

            

        </div>

    </div>

    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}


    </div>
  )
}

export default Sidebar