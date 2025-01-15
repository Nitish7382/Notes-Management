import React from 'react'
import TagInput from '../../components/Input/TagInput'

const AddEditNotes = () => {
  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input
        type='text'
        className='text-2xl text-slate-950 bg-slate-50 rounded-lg p-1 outline-none '
        placeholder='Go to Read the Book'
        />
      </div>

      <div className='flex flex-col mt-8'>
        <label className='input-label'>Content</label>
        <textarea
        type='text'
        className='text-base text-slate-950 outline-none bg-slate-50 p-2 rounded'
        placeholder='Write your contend Here'
        rows={10}
        />
      </div>

      <div className='mt-3'>
        <label className='input-label'>Tags</label>
        <TagInput/>
      </div>

      <button className='btn-primary font-medium mt-5 p-3' onClick={()=> {}}>
        Add
      </button>
    </div>
  )
}

export default AddEditNotes
