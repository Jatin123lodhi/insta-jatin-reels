import React from 'react'

export const ProfileShimmer = () => {
  return (
    <div className='w-full  my-8 py-4 flex justify-between px-4 items-center shadow'>
        <div className='w-1/2 flex justify-center'><div className='h-24 w-24 rounded-full border-2 border-gray-300 bg-gray-100 '></div> </div>
        <div className='  w-1/2 p-1'>
            <div className='p-2 bg-gray-200 w-52 rounded-xl m-1'> </div>
            <div className='p-2 bg-gray-200 w-52 rounded-xl m-1'> </div>
            
        </div>
    </div>
  )
}
