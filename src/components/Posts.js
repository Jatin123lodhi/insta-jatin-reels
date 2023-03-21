import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { Like } from "./Like";
import { Video } from "./Video";
import { Comment } from "./Comment";
import { PostShimmer } from "./PostShimmer";
import { useNavigate } from "react-router-dom";

export const Posts = ({ userData }) => {
  //console.log(user,'user')
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate()
  const showProfile = (userId)=>{
    //navigate to profile page with this userId
    
    navigate("/profile/"+userId)
  }
  useEffect(() => {
    //bring the posts data from firebase
    let parr = [];
    //let post_div = document.getElementById('post_div')
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), docId: doc.id };
          parr.push(data);
        });
        setPosts(parr);
        
      });
      //console.log(posts)
    return () => unsub();
  }, []);
  // intersection observer api
  const playVideo = (entries)=>{
      //console.log(entries)
      entries.forEach((entry)=>{
          //console.log(entry.target)
          let ele = entry.target
          ele.play().then(()=>{
              if(!ele.paused && !entry.isIntersecting){
                  ele.pause()
              }
          })
      })
  }
  let options = {
    root:  document.getElementById("post_div") ,
    threshold: 0.6
  }
  let observer = new IntersectionObserver(playVideo, options);
  useEffect(()=>{
      let videoElements = document.getElementsByTagName("video");
      //console.log("videoElements : " ,videoElements)
      videoElements = [...videoElements]
      videoElements.forEach((element)=>{
          observer.observe(element)
          //console.log('observer applied to ele:',element)
      })
      //console.log('observer useEffect done') 
  },[posts?.length])

 

  //console.log(posts,'   posts')
  return (
    <div className="  h-[30rem] overflow-y-scroll scroll-smooth flex justify-center snap-y" id="post_div" >
      {posts === null ? (
        <PostShimmer/>
      ) : (
        <div className="m-1 h-max w-max  flex flex-col py-2" >
          {posts.map((post) => (
            
            <div className="relative my-2 " key={post.postId}>
              {/* videocard */}
              <Video postUrl = {post.postUrl}    />
              {/* avatar username like comment */}
              <div className="absolute bottom-20 left-5 ">
                <div className="flex items-center">
                  <div className="cursor-pointer flex" onClick={()=>{showProfile(post.userId)}}>
                    <img
                      className="w-9 h-9 rounded-full"
                      src={post.uPrfile}
                      alt="avatar"
                    />
                    <span className="text-white mx-2 p-1">{post.userName}</span>
                  </div>
                  <Like userData={userData} postData={post} />
                  <Comment postData={post} userData={userData} />
                </div>
              </div>
            </div>
          ))}
        {/* {console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')} */}
        </div>
      )}
    </div>
  );
};
 