import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { updatePfp } from '../../../../services/operations/profileAPI'
import { set } from 'react-hook-form'

const ChangeProfilePic = () => {
    const {user} = useSelector((state)=>state.profile.user)

    const pfp = useSelector((state)=>state.profile.user.image)

    const [profilePicture, setProfilePicture] = useState(pfp);
    const token = useSelector((state)=> state.auth.token)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0];
        updatePfp(token,file);

    } 
    const handlefileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)


        }
    
    

    

    

  return (
    <div className=' bg-richblack-700 p-7 rounded-lg flex gap-7' >
    <div>
        <img src={profilePicture} alt={user?.firstName} className='aspect-square w-[70px] rounded-full object-cover' />
    </div>

    <div className='flex flex-col gap-3'>
        <p className='text-white text-lg'>Change Profile Picture</p>
        <form onSubmit={handleOnSubmit}>
            <div className='flex gap-4'>
            <label htmlFor='upload' className='cursor-pointer bg-yellow-50 px-2 rounded-md'>Select
            <input type='file' id='upload' accept='image/png, image,gif, image/jpeg' className='hidden' onClick={handlefileChange}/></label>
            <button type='submit' className='cursor-pointer bg-yellow-50 px-2 rounded-md' >Upload</button>
           
        </div>
        </form>
        
    </div>

    </div>
  )
}

export default ChangeProfilePic