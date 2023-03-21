import React from 'react'
import { Navbar } from './Navbar';
import { VideoWrapper } from './VideoWrapper';
import { ProfileLowerShimmer } from './ProfileLowerShimmer';
import { ProfileShimmer } from './ProfileShimmer';
import { usePosts } from '../context/PostContext';
import { useParams } from 'react-router-dom';
import { createContext, useContext,useEffect, useState } from "react";
import {  useUserData } from '../context/UserContext';
import { query,where,getDocs, documentId } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { firestore,database } from '../firebase';
export const Profile = () => {
  const param = useParams()
  const userId = param.id;
  //we got user id  now bring the user data by applying a listener of doc(userId)

  const [userData,setUserData] = useState(null);
  const [posts,setPosts] = useState(null);
  useEffect(()=>{
      database.users.doc(userId).onSnapshot((doc)=>{
          setUserData(doc.data());
      })
  },[])
  
  // now bring the posts which have give userId
    useEffect(()=>{
        if(userId!=undefined){
          const q = query(collection(firestore,"posts"),where("userId","==",userId) )
          getDocs(q)
          .then((querySnapshot)=>{
            let arr = []
            querySnapshot.forEach((doc)=>{
              arr.push({...doc.data(),docId:doc.id})
            })
            setPosts(arr)
          })
          .catch((err)=>console.log(err.message))
        }
    },[])
   
  // const {user,posts} = usePosts();
  
  return (
    <div>
        
           <div>
                <Navbar />
                {/* Upper section */}
                { userData==null  ? <ProfileShimmer/> :
               <>
                <div className='w-full  my-8 py-4 flex justify-between px-4 items-center shadow'>
                    <div className='w-1/2 flex justify-center'><img className="h-24 w-24 rounded-full border-2 border-gray-600 my-1 hover:border-blue-500 cursor-pointer " src={userData.profileImageUrl} alt="profileImg" /></div>
                    <div className='  w-1/2 p-1'>
                        <div>Email : {userData.email}</div>
                        <div>Posts : {userData?.postIds==undefined ?  <span>0</span> : <span>{userData?.postIds?.length}</span>} </div>
                    </div>
                </div>
               
                {/* Below section */}
                { posts==null ? <ProfileLowerShimmer/> :  
                <div className='  h-full w-full flex flex-wrap justify-center p-2'>
                 
                    { 
                        posts.map((post)=>
                            <VideoWrapper postData={post} userData={userData} key={post.postId}/>    
                        )
                    } 
                </div>
                } 
              </>}
           </div> 
       
    </div>
  )
}
