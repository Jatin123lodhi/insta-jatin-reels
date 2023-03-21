import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import instaLogo from '../assests/Instagram.JPG'
import exploreIcon from '../assests/explore.png'
import { useUserData } from "../context/UserContext";
 
export const Navbar = () => {
  //console.log("userData in NavBar: ", userData)
  const [open,setOpen] = useState(false)
  const {userData} = useUserData()
  const {logout} = useAuth()  
  
  const navigate = useNavigate();
 
  const handelProfile = ()=>{
    navigate('/profile/'+userData?.userId)
  }
  const handelBannerClick = ()=>{
    navigate('/')
  }
  const handelExplore = ()=>{
    // navigate('../https://leetcode.com/jatinlodhi111/')
    // let win = window.open('https://leetcode.com/jatinlodhi111/','_blank');
    navigate('/explore')
  }
  return (
    <div className="w-full rounded-md  p-2 shadow-lg flex items-center justify-between">
      <div onClick={handelBannerClick} className="cursor-pointer ml-6"><img className='h-12'  src={instaLogo} alt='inta-logo' /></div>
      <div className="  m-2 p-1 flex items-center"> 
        <div onClick={handelBannerClick} className='cursor-pointer mx-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>
        
        <div onClick={handelExplore} className='cursor-pointer mx-2'><img className="w-6 h-6 " src={exploreIcon} alt="exploreIcon"/></div>
        {/* Profile section */}
        <div onClick={()=>setOpen(!open)} className='cursor-pointer mx-2'>
          <div>{userData==null ?<div className="h-8 w-8   rounded-full shadow-md border border-gray-500" ></div>  :  <img className="h-8 w-8   rounded-full shadow-md " src={userData?.profileImageUrl} alt="profileImg" />}</div>
          {open && 
          <>
            <button className='fixed inset-0 w-full h-full cursor-default  z-10 ' onClick={()=>setOpen(false)}></button>
            <div className="w-28 border border-gray-300 bg-white rounded p-1 text-center m-1 fixed right-5 flex flex-col z-20">
              <div className="hover:bg-gray-200  ">
                <div onClick={handelProfile} className='cursor-pointer m-1 flex'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0 mx-2">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                  Profile 
                </div>
              </div>
              <div className="hover:bg-gray-200">
                <div onClick={logout} title='Logout' className="cursor-pointer m-1 flex" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0 mx-2 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Logout
                </div>
              </div>
            </div>
          </>
        }  
        </div>
      </div>
    </div>
  )
  ;
};
