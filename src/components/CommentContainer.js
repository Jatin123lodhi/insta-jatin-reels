import React, { useEffect, useState } from "react";
import { AddComment } from "./AddComment";
import { Like } from "./Like";
import { database, firestore } from "../firebase";
import {
  query,
  where,
  onSnapshot,
  doc,
  getDocs,
  collection,
  orderBy,
  Timestamp,
} from "firebase/firestore";
export const CommentContainer = ({ postData, userData }) => {
  const [comments, setComments] = useState(null);
  const [likesCount,setLikesCount] = useState(0);
   
  //attached a listener to posts doc , so that any changes will reflect here also
  useEffect(() => {
    //console.log(postData,'  <<')
    //console.log( "doc:  " ,  doc(database.posts, postData.docId) )
    const unsub = onSnapshot(doc(database.posts, postData.docId),async (doc) => {
      const data = doc.data()
      //console.log('post data updated : ',data)
      setLikesCount(data?.likes?.length);
      //query to bring the multiple comments documents 
      const q = query(collection(firestore,"comments"), where("postId","==",postData.postId ),orderBy("createdAt","desc") )
      const querySnapshot = await getDocs(q);
      let arr = []
      querySnapshot.forEach((doc) => {
        arr.push(doc.data())
      });
      setComments(arr);
    });
    return () => unsub();
  }, []);
  
  const convertTimestampToDate = (comment)=>{
    const dateObj = new Timestamp(comment.createdAt.seconds,comment.createdAt.nanoseconds).toDate()
    const time =dateObj.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit',
    })
    const date = dateObj.toLocaleDateString()
     
    return time+"    "+date;
  }
  
  
  return (
    <div className=" w-full sm:w-1/2  h-[32rem] border border-gray-100  flex flex-col items-center justify-end ">
      {/* all the comments of this post */}
      <div className="w-full sm:w-3/4 h-[32rem] sm:h-full  overflow-y-scroll my-4  border">
        {comments == null ? (
          <>Loading...</>
        ) : (
          comments.map((comment) => {
             
            return (
              <div className="flex justify-start  m-1 p-1  shadow-sm " key={comment.uid}>
                <div className="shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={comment.uProfile}
                    alt="avatar"
                  />
                </div>
                {/* Name Message Timestamp */}
                <div className="flex flex-col  w-full ">
                  <div className="flex">
                    <div className="shrink-0">
                      <span className="mx-2 ">{comment.uName}</span>
                    </div>
                    <div className=" ">
                      <span className="mx-2 text-gray-600 break-words">
                        {comment.text}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm ml-2">{ convertTimestampToDate(comment)}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* bottom add comment section  */}
      <div className="shadow mb-4 p-2 h-24 flex flex-col justify-end w-full   sm:w-3/4">
        {likesCount === 0 ? <>Like it !!</> : (
          <div>
            Liked by {" "}
            {likesCount == 1 ? likesCount + " user" : likesCount + " users"}
          </div>
        )}
        <div className="flex items-center   ">
          <div>
            <Like userData={userData} postData={postData} />
          </div>
          <AddComment postData={postData} />
        </div>
      </div>
      <div></div>
    </div>
  );
};
