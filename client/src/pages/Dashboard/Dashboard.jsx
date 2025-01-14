import React from 'react'
import NavBar from '../../components/Navbar/NavBar'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'

const Dashboard = () => {
  return (
    <>
        <NavBar/>
        <div className='container mx-auto px-4 py-4'>
          <div className='grid grid-cols-3 gap-4'>
          <NoteCard
          title='Note Title'
          date='12/12/2021'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat'
          tags='#meetings'
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          OnPinNote={() => {}}        
          />
          </div>
        </div>

        <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'>
          <MdAdd className='text-[32px] h-10 w-10 text-white'/>
        </button>

        <AddEditNotes/>
    </>
  )
}

export default Dashboard