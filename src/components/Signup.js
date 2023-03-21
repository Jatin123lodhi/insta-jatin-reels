import React, { useContext, useState } from 'react'
import instaLogo from '../assests/Instagram.JPG'
import {Link,useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { database, storage } from '../firebase'; 
import { InstaCrousal } from './InstaCrousal';
export const Signup = () => {
  const  [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [name,setName] = useState('');
  const {signup} = useContext(AuthContext);
  const navigate = useNavigate();


  const handelClick = async ()=>{
    if(file==null){
      setError({message:'Please upload the profile image first'});
      setTimeout(()=>{
        setError('')
      },2000)
      return;
    }
    try{
      //creating new user 
      setError('');
      setLoading(true);
      const userObj = await signup(email,password);
      let uid =  userObj.user.uid;
      console.log(uid,'  uid')
      // uploading task

      
      const uploadTask = storage.ref(`/users/${uid}/profileImage`).put(file);
      uploadTask.on("state_changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} done.`);
      }
      function fn2(error) {
        setError(error)
        setTimeout(() => {
          setError('')
        }, 2000);
        console.log("error", error);
        setLoading(false)
        return;
      }
      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          if(name=='')setName(email)
          database.users.doc(uid).set({
            email: email,
            fullName : name,
            userId : uid,
            profileImageUrl: url,
            createdAt: database.getTimeStamp
          })
        });
        setLoading(false);
        navigate('/');
      }
    }catch(err){
      setError(err);
      setTimeout(()=>{
        setError('');
      },2000)
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-center flex-col sm:flex-row items-center'>
    <div className='w-96 mt-14 mr-2 '>
      <InstaCrousal/>
    </div>
    <div className='w-[22rem] mt-14 pb-2 mb-4'>
        <ul className='p-2 px-4 border border-gray-300 shadow rounded'>
            <li className='flex justify-center rounded'><img className='m-2'  src={instaLogo} alt='inta-logo' /></li>
            <li className='rounded p-2 text-center w-full text-sm text-gray-400'>Sign up to see photos and videos from your friends.</li>
            {error!=='' && <li className='rounded bg-red-200 p-2 '> {error?.message} </li>} 
            <li><input className=' rounded p-2 mt-2 border border-gray-300 w-full' type='text' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}  /></li>
            <li><input className=' rounded p-2 mt-2 border border-gray-300 w-full ' type='text' placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)} /></li>
            <li><input className=' rounded p-2 mt-2 border border-gray-300 w-full ' type='text' placeholder='Full Name' required value={name} onChange={(e)=>setName(e.target.value)}  /></li>
            <li>{/* <button className='rounded p-2 mt-2 border border-purple-500 text-purple-500 text-center w-full'>
              Upload profile image */}
              <input required className='cursor-pointer file:cursor-pointer mt-2 file:px-2 file:py-1 file:border-blue-500 file:rounded file:bg-gray-100 file:text-blue-500 w-full ' type='file' accept='image/*' placeholder='Upload profile image' onChange={(e)=>setFile(e.target.files[0])} />
            {/* </button> */}</li>
          
            <li>{loading==true ? <button onClick={handelClick} disabled={loading} className=' rounded p-2 mt-4 bg-blue-500 text-white text-center w-full'>Wait...</button> : <button onClick={handelClick} disabled={loading} className=' rounded p-2 mt-4 bg-blue-600 text-white text-center w-full'>Sign up</button>}</li>  
            <li className=' rounded text-center mt-2 text-sm text-gray-400'>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</li>
        </ul>
        <div className='rounded shadow p-1 text-center border border-gray-300 mt-4 '>
            <span className='text-gray-400'>Have an account?</span> <button><Link to='/login'>Login</Link></button>
        </div>
    </div>
    </div>
  )
}
