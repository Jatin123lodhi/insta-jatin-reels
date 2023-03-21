import React from 'react'
import { Video } from './Video'
import { CommentContainer } from './CommentContainer';
export const VideoCommentModal = ({postData,userData,setOpen,open}) => {
        
  return (
    open && 
    <div className='w-full sm:h-full fixed  inset-0   flex justify-center sm:items-center z-10 overflow-auto '>
    <button className='fixed inset-0 w-full h-full   bg-gray-200 z-20 cursor-default' onClick={()=>setOpen(false)}></button>
    <div className="w-2/3  h-max mt-4 sm:mt-0 mb-4 sm:mb-0  sm:h-[34rem] bg-white flex flex-col items-center justify-center sm:flex-row shadow-lg z-30 rounded p-2  ">
      {/* Video section on left */}
      <div className=" sm:w-1/2  h-[32rem]  flex justify-center items-center ">
        <Video postUrl={postData.postUrl} />
      </div>
      {/* Comments section on right  */}
      <CommentContainer postData={postData} userData={userData}  />
    </div>
    </div>
  );
};
 