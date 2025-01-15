import React from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags,setTags}) => {
  return (
    <div>
        <div className='flex items-center gap-3 mt-3'>
            <input 
            type='text'
            className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
            placeholder='Add Tags'
            />

            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-primary'>
                <MdAdd className='text-2xl text-primary hover:text-white '/>
            </button>

        </div>
    </div>
  )
}

export default TagInput
