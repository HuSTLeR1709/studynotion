import React from 'react'
import EditProfile from './EditProfile'
import ChangeProfilePic from './ChangeProfilePic'
import UpdatePassword from './UpdatePassword'
import DeleteProfile from './DeleteProfile'

const Settings = () => {
  return (
    <div className='flex flex-col gap-7'>

        <h1 className='text-3xl text-white mb-4'>
            Edit Profile
        </h1>

        <ChangeProfilePic/>

        <EditProfile/>

        <UpdatePassword/>

        <DeleteProfile/>
    </div>
  )
}

export default Settings