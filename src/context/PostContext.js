// import { createContext, useContext,useEffect, useState } from "react";
// import {  useUserData } from '../context/UserContext';
// import { query,where,getDocs, documentId } from 'firebase/firestore';
// import { collection } from 'firebase/firestore';
// import { firestore } from '../firebase';
// export const PostContext = createContext();
 
// //custom hook
// export const usePosts = ()=>{
//     return useContext(PostContext);
// }
// export const PostProvider = ({children})=>{
//     const [posts,setPosts] = useState(null);
    
//     const { userData } = useUserData();
//     const user = userData;
//     //logic
//     useEffect(()=>{
//         console.log(userId,'  userId')
//         if(userId!=null){
//           const q = query(collection(firestore,"posts"),where("userId","==",userId) )
//           getDocs(q)
//           .then((querySnapshot)=>{
//             let arr = []
//             querySnapshot.forEach((doc)=>{
//               arr.push({...doc.data(),docId:doc.id})
//             })
//             setPosts(arr)
//           })
//           .catch((err)=>console.log(err.message))
//         }
//     },[userId])
//     const store = {
//         user,
//         posts,
//     }
//     return <PostContext.Provider value={store} >{children}</PostContext.Provider>
// }  