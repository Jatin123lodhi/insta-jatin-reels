import React, { useEffect, useState } from "react";
import { LikeIcon } from "../assests/LikeIcon";
import { database } from "../firebase";

export const Like = ({ postData, userData }) => {

  //console.log('userData: ',userData)
  const [like, setLike] = useState(false);
  useEffect(() => {
    let check = postData.likes.includes(userData?.userId);
    setLike(check);
  }, [postData]);

  const handelLike = () => {
    //console.log("userData: ",userData)
    //console.log("PostData: ",postData)
    if (like) {
      setLike(false);
      let newArr = postData.likes.filter((ele) => {
        return ele != userData.userId;
      });
      //console.log(newArr, "  newArr");
      database.posts.doc(postData.docId).update({
        likes: newArr,
      });
    } else {
      setLike(true);
      let newArr = [...postData.likes, userData?.userId];
      //console.log(newArr, "new Arr");
      //console.log('postData.docId: ',postData.postId)
      //console.log("doc: ", database.posts.doc(postData.postId))
      database.posts.doc(postData.docId).update({
        likes: newArr,
      });
    }
  };

  return (
    <div className="text-xl cursor-pointer" onClick={handelLike}>
      {/* <LikeIcon color={color} /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={like ? "red" : "white"}
        viewBox="0 0 24 24"
        strokeWidth={0.5}
        stroke="gray"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </div>
  );
};
 
