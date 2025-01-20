import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'


const SearchBar = ({value, onChange, onClearSearch,handleSearch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-200 rounded-xl'>
        <input 
        type="text"
        placeholder='Search Notes'
        className='w-full text-xs bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
        />

    { value && <IoMdClose 
    className='mr-2 hover:scale-110 h-5 w-5 text-slate-500 cursor-pointer hover:text-black'
    onClick={onClearSearch}
    />}
        <FaMagnifyingGlass 
        className='text-slate-500 cursor-pointer hover:text-black hover:scale-110'
        onClick={handleSearch}
        />
    </div>
  )
}

export default SearchBar
