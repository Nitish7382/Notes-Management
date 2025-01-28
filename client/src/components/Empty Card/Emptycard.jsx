import React from 'react';

const Emptycard = ({imgSrc,messege}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-24' >
      <img src={imgSrc} alt='No Notes'  className='w-72'  />
      <p className='w-1/2 text-base font-medium text-slate-700 text-center leading-7 mt-5' >{messege}</p>
    </div>
  );
};

export default Emptycard;
