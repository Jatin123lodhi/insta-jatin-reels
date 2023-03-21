import React, { useContext, useEffect, useState } from "react";
import {   useAuth } from "../context/AuthContext";
import { useUserData } from "../context/UserContext";
import { database } from "../firebase";
import { Navbar } from "./Navbar";
import { Posts } from "./Posts";
import { UploadFile } from "./UploadFile";
import { Video } from "./Video";

export const Feed = () => {
  const {userData} = useUserData()
  //console.log("userData in Feed : ", userData)
  //const { userData } = useAuth()
  // const [userData, setUserData] = useState("");
  
  // useEffect(() => {
  //   console.log("user.userId: ",user)
  //   const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
  //     console.log("snapshot.data: ",snapshot.data())
  //     setUserData(snapshot.data());
  //   });
  //   return () => unsub();
  // }, [user]);
  //const {userData} = useContext(UserContext)
  return (
    <div className="p-2 m-2 mt-0">
      <Navbar/>
      <UploadFile user={userData} />
      <Posts userData={userData}/>
    </div>
    
  );
};
