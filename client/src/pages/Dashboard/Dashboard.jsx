import React, { useState } from 'react'
import NavBar from '../../components/Navbar/NavBar'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'

const Dashboard = () => {

  const [openAddEditModal,setOpenAddEditModal]= useState({
    isShown:false,
    type:"add",
    data: null,
  });

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
          <MdAdd className='text-[32px] h-10 w-10 text-white'
          onClick={()=>{
            setOpenAddEditModal({isShown:true ,type: 'add',data:null});
          }}
          />
        </button>

        <Modal 
        isOpen = {openAddEditModal.isShown}
        onRequestClose = {()=> {}}
        style= {{
          overlay:{
            backgroundcolor: "rgba(0,0,0,0.2)"
          },
        }} 
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 border"
      >
        <AddEditNotes/>
      </Modal>
    </>
  )
}

export default Dashboard