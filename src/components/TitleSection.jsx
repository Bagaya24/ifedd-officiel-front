import React from 'react'

export default function TitleSection({ title}) {
  return (
    <div className=' w-full flex flex-col justify-center items-center mb-8 my-4'>

      <h1 className='md:text-5xl text-2xl font-bold text-[#1769aa]'>
        {title}
      </h1>


      {/* <p className='text-lg text-blue-500 bg-blue-50 border border-blue-300 rounded-2xl p-2 my-5'>
        {sub}
      </p> */}


    </div>
  )
}
