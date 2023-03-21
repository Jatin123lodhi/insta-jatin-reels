import React, { useContext, useState } from 'react'
import instaLogo from '../assests/Instagram.JPG'
import { Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext';
import { InstaCrousal } from './InstaCrousal';

export const Login = () => {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[error,setError] = useState('');
  const[loading,setLoading] = useState(false);
  const store = useContext(AuthContext);
  const navigate = useNavigate();
  const {login} = store;
  const handelSignin = async(e)=>{
    e.preventDefault();
    try{
      setError('');
      setLoading(true);
      let  res = await login(email,password);
      setLoading(false);
      navigate('/');
    }catch(err){

      console.log(err,'  error in login page')
      setError(err.message);
      setTimeout(()=>{
        setError('');
      },3000)
      setLoading(false)
    }
  }
  return (
    <div className=' flex justify-center flex-col sm:flex-row  items-center mt-14 mb-5 '>
    <div className=' mr-2 '>
      <InstaCrousal/>
    </div>
    <div className='    mb-2 pb-4 '>
        <form onSubmit={handelSignin} className="  w-[22rem] ">
          <ul className='p-2 px-4 border border-gray-300 shadow rounded'>
              <li className='flex justify-center rounded'><img className='m-1'  src={instaLogo} alt='inta-logo' /></li>
              {error!=='' && <li className='rounded bg-red-200 p-2 '> {error} </li> }
              <li><input className=' rounded p-2 mt-1 border border-gray-300 w-full' type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required /></li>
              <li><input className=' rounded p-2 mt-2 border border-gray-300 w-full ' type='text' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required  /></li> 
              <li><button className=' rounded p-2 mt-1  text-blue-600 text-center w-full'><Link to='/password-reset'>Forgot Password ?</Link></button></li>
              <li><button disabled={loading}   className=' rounded p-2 my-2 bg-blue-600 text-white text-center w-full'>Log In</button></li> 
          </ul>
        </form>
        <div className='rounded shadow p-1 text-center border border-gray-300 mt-4 '>
            <span className='text-gray-400'>Don't have an account?</span> <button><Link to='/signup'>Sign up</Link></button>
        </div>
    </div>
    </div>
  )
}
