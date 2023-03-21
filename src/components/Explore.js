import React, { useState,useEffect } from 'react'
import { Navbar } from './Navbar'
// import { Video } from './Video'
import { query,collection,getDocs } from 'firebase/firestore'
import { firestore } from '../firebase'
export const Explore = () => {
  //bring all posts and start playing them
  const [posts,setPosts] = useState(null)
  useEffect(()=>{
        
        const q = query(collection(firestore,"posts"))
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
    ,[])
  return (
    <div>
        <Navbar/>
        <div className='mt-4 flex flex-wrap justify-center'>
        {posts==null ? <Shimmer/> :  
             
            posts.map((post )=>{
                return <Video postUrl={post?.postUrl}    key={post.postId}/>
            }) 
        }
        </div>
    </div>
  )
}

const Video = ({postUrl })=>{
    return (
        <div className="flex justify-center">
            <video controls loop  muted   className="border border-gray-100 snap-start h-[19rem] w-[11rem] rounded-xl">
                <source src={postUrl} type="video/mp4" />Your browser does not support the video tag.
            </video>
        </div>
    )
}
const Shimmer = ()=>{
    return (
        <div>
            {
                Array(10)?.fill("").forEach(()=>{
                     return <div className='border border-gray-100  bg-gray-100 h-[19rem] w-[11rem] rounded-xl'></div>
                })
            }
        </div>
    ) 
}
