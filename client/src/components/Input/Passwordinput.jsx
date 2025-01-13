import React, {useState} from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa6'

const Passwordinput = ({value,onChange,placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword); 
    };

  return (
    <div className='flex items-center w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded-sm mb-4 outline-none'>
        <input type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"} className=" w-full text-sm  mr-3 bg-transparent outline-none  rounded"/>

        {isShowPassword ? <FaRegEye
        size={22}
        className="text-primary crusor-pointer"
        onClick={toggleShowPassword}
        /> : <FaRegEyeSlash
        size={22}
        className='text-slate-500 cursor-pointer'
        onClick={toggleShowPassword}
        />}
    </div>
  )
}

export default Passwordinput