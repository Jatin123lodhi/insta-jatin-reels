import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import instaLogo from '../assests/Instagram.JPG'
import { useAuth } from '../context/AuthContext';
import { InstaCrousal } from './InstaCrousal';
export const ForgotPassword = () => {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState(''); 
  const[loading,setLoading] = useState(false);
  const[error,setError] = useState('')
  const {resetPassword} = useAuth()
  const navigate = useNavigate(); 
  const handelClick = async ()=>{
    try{
        setError('');
        setLoading(true);
        let  res = await resetPassword(email);
        console.log(res,  ' res');
        setLoading(false);
        navigate('/login');
      }catch(err){
        console.log(err,  '    err while resting pass')
        setError(err+'');
        setTimeout(()=>{
          setError('');
        },2000)
        setLoading(false)
      }
  }
  return (
    <div className='flex justify-center flex-col sm:flex-row items-center'>
    <div className='w-96 mt-14   '>
      <InstaCrousal/>
    </div>
    <div className='w-[22rem] mt-14  mb-4 pb-4'>
        <ul className='p-2 px-4 border border-gray-300 shadow rounded'>
            <li className='flex justify-center rounded'><img className='m-1'  src={instaLogo} alt='inta-logo' /></li>
            {error!=='' && <li className='rounded bg-red-200 p-2 '> {error} </li> }
            <li><input className=' rounded p-2 mt-1 border border-gray-300 w-full' type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}  /></li>
            {/* <li><input className=' rounded p-2 mt-2 border border-gray-300 w-full ' type='text' placeholder='New Password' value={password} onChange={(e)=>setPassword(e.target.value)}  /></li>  */}
            {/* <li><button className=' rounded p-2 mt-1  text-blue-600 text-center w-full'><Link to='/login'>Forgot Password ?</Link></button></li> */}
            <li><button disabled={loading} onClick={handelClick} className=' rounded p-2 my-2 bg-blue-600 text-white text-center w-full'>Send Login Link</button></li> 
        </ul>
        <div className='rounded shadow p-1 text-center border border-gray-300 mt-4 '>
            <span className='text-gray-400'>Don't have an account?</span> <button><Link to='/signup'>Sign up</Link></button>
        </div>
    </div>
    </div>
  )
}
