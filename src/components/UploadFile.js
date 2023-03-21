import React, { useState } from "react";
import {v4 as uuidv4 } from 'uuid'
import { database,storage } from "../firebase";
export const UploadFile = (props) => {
  //console.log(props.user,'   user')
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const [progress,setProgress] = useState(0);
  const [isVisible,setIsVisible] = useState(false);
  const videoUploadedAlert = ()=>{
    setIsVisible(true);
    setTimeout(()=>{
      setIsVisible(false)
    },3000)
  }
  const handelChange = async (file)=>{
     setLoading(true);
     if(file==null){
        setError('Please select a file first');
        setTimeout(() => {
          setError('')
        }, 2000);
     }
     else if(file.size/(1024*1024)> 100){
      setError('This video is very big')  
      setTimeout(()=>{
          setError('')
        },2000)
     }else{
      // uploading task
      let uid = uuidv4();
      const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
        console.log(`Upload is ${progress} done.`);
      }
      function fn2(error) {
        setError(error)
        setTimeout(() => {
          setError('')
        }, 2000);
        console.log("error", error);
        setLoading(false)
        setProgress(0);
        return;
      }
      function fn3() {
        setLoading(true)
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          let obj = {
            likes : [],
            comments: [],
            postId: uid,
            postUrl: url,
            userName: props?.user?.fullName,
            uPrfile: props?.user?.profileImageUrl,
            userId: props?.user?.userId,
            createdAt: database?.getTimeStamp
          }
          // console.log('>>>',obj.userName,'<<<  >>>',  props.user.fullName,'<<<')
          database.posts.add(obj).then(async (ref)=>{
            // console.log('>>>',props.user.postIds,'<<<< postIds')
            let res = await database.users.doc(props.user.userId).update({
              
              postIds: props.user.postIds!=null ? [...props.user.postIds,ref.id]: [ref.id]
            }).then(()=>{
              setLoading(false)
              setProgress(0);
              videoUploadedAlert()
            }).catch((err)=>{
              setError(err)
              setTimeout(() => {
                setError('')
              }, 2000);
              setLoading(false)
              setProgress(0);
              console.log("loading : ", loading)
            })
          })
        }); 
        //store the file in storage
        //store the info about that file
        //store the postId into user obj
     }
     setLoading(false);
  }
}
  const handelChange1 = (file)=>{
    console.log('handelchannge1')
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      console.log('loading false')
    },5000)
  }
  return (
    <div className="mt-1  flex justify-center p-1  ">
      <div className=" ">
         {error!='' &&<div className="p-1 m-1 mb-2 bg-red-400 text-white rounded">{error} dfdfdfdf</div>}
         <div className="  flex flex-col items-center">
         <label htmlFor="files" className="cursor-pointer border-2 border-purple-700 px-3 py-1  m-1 rounded text-purple-700 text-center w-40"  >🎬 Upload Video</label>
         <input type='file' id='files'   disabled={loading}  className="hidden cursor-pointer file:cursor-pointer mt-2 file:px-2 file:py-1 file:border-blue-500 file:rounded file:bg-gray-100 file:text-blue-500" onChange={(e)=>{handelChange(e.target.files[0])}} accept="video/*"   />
         <div className="flex mt-1   ">
          <div className=" text-sm mt-1 w-40 bg-gray-200 rounded-full h-2.5  dark:bg-gray-700 ">
            <div className=" bg-blue-600 h-2.5 rounded-full " style={{width: `${progress}%`}} ></div>
          </div>
          <div>{progress!==0 && progress.toFixed(2) +'%'}</div>          
        </div>
        </div>
        {isVisible &&  <div className="text-gray-700 border-2 border-purple-600 p-2 rounded-xl">New Video Uploaded 🚀 at top !!</div> }
      </div>
    </div>
  );
}
