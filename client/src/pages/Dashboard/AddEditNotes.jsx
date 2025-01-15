import React, {useState} from 'react'
import TagInput from '../../components/Input/TagInput'

const AddEditNotes = () => {

  const  [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags,setTags] = useState([])

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input
        type='text'
        className='text-2xl text-slate-950 bg-slate-50 rounded-lg p-1 outline-none '
        placeholder='Go to Read the Book'
        value={title}
        onChange={({target})=>{setTitle(target.value)}}
        />
      </div>

      <div className='flex flex-col mt-8'>
        <label className='input-label'>Content</label>
        <textarea
        type='text'
        className='text-base text-slate-950 outline-none bg-slate-50 p-2 rounded'
        placeholder='Write your content Here'
        rows={10}
        value={content}
        onChange={({target})=>{setContent(target.value)}}
        />
      </div>

      <div className='mt-3'>
        <label className='input-label'>Tags</label>
        <TagInput
        tags={tags} 
        setTags={setTags}
        />
      </div>

      <button className='btn-primary font-medium mt-5 p-3' onClick={()=> {}}>
        Add
      </button>
    </div>
  )
}

export default AddEditNotes
