import React, { useState } from 'react'
import { Video } from './Video';
import { VideoCommentModal } from './VideoCommentModal';

export const VideoWrapper = ({postData,userData}) => {
   //console.log(postData,'  post')
  const [open,setOpen] = useState(false);
    return (
    <div className='videoWrapper  m-1'>
      <div onClick={()=>setOpen(true)} className='w-[18rem]   p-2 m-2 cursor-pointer' >
        <Video postUrl = {postData.postUrl}   />
      </div>
      <VideoCommentModal postData={postData} userData={userData} setOpen={setOpen} open={open}  />
    </div>
  )
}
