import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({OnLogout}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className=' h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center font-bold'>
        {getInitials('Nitish Kumar Mohanty')}    
      </div>
      <div className='justify-center flex-col items-center'> 
        <p className='text-sm font-medium'>
            Nitish Kumar Mohanty
        </p>
        <button className='text-sm text-red-500 underline' onClick={OnLogout}>
            LogOut
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
