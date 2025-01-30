import React from 'react'
import { getInitials } from '../../utils/helper'
import { useLocation } from 'react-router-dom'

const ProfileInfo = ({OnLogout,userInfo}) => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <div className='flex items-center gap-3'>
      <div className=' h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center font-bold'>
        {getInitials(userInfo?.fullName)}    
      </div>
      <div className='justify-center flex-col items-center'> 
        <p className='text-sm font-medium'>
           {userInfo?.fullName}
        </p>
        <button className='text-sm text-red-500 underline' onClick={OnLogout}>
            LogOut
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
