import React from 'react'
import { useState } from 'react';
import { database } from '../firebase';
import {v4 as uuidv4 } from 'uuid'
import { useUserData } from '../context/UserContext';
export const AddComment = ({postData}) => {
    const [text,setText] = useState(''); 
    const {userData} = useUserData()
    console.log(userData)
    const handelPost = (e)=>{
        e.preventDefault()
        let uid = uuidv4()
        let obj = {
            text : text,
            uName : userData.fullName,
            uProfile: userData.profileImageUrl,
            uid: uid,
            createdAt: database.getTimeStamp,
            postId: postData.postId
        }
        //adding the comment obj to comments collection
        database.comments.add(obj)
        .then((doc)=>{
            //console.log("doc exists : ",database.posts.doc(postData.docId))
            database.posts.doc(postData.docId).update({
                comments : [...postData.comments,doc.id]
            }).then(()=>{
                console.log("posts doc updated")
            })
            .catch((err)=>{console.log(err.message)})
        })
        .catch((err)=>{
            console.log('error: ',err.message)
        })
        setText('');
    }
  return (
    <form onSubmit={handelPost} className="flex  w-full">
        <div className='w-full sm:w-3/4'><input className='w-full p-2 m-2 mr-1 rounded border-gray-400' type='text' value={text} onChange={e=>setText(e.target.value)} placeholder='Write a comment...' /></div>
        <div><button className='p-2 m-2 ml-3 border bg-pink-500 text-white rounded'>Post</button></div>
    </form>
  )
}
