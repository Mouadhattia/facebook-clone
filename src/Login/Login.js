import React, { useState } from 'react';
import './Login.css';
import {Link,useHistory} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';



const Login = ({setPing,ping}) => {
  const history =useHistory("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const login =(e)=>{
    const auth = getAuth()
     e.preventDefault();
     
      
      signInWithEmailAndPassword(auth, email, password)
      
      .then((response) => {
        history.push('/')
    }).catch((error)=>{
      if(
        error.code ==='auth/wrong-password'
      ){
        toast.error('Please check your credentials again');
      
      } else if(
        error.code === 'auth/user-not-found'
      )
      {
        toast.error('Please check your credentials again');
        
      }
      else if(
        error.code === 'auth/invalid-email'
      )
      {
        toast.error('Invalid email');
        
      }
      else if(
        error.code === 'auth/internal-error'
      )
      {
        toast.error('Please fill your password');
        
      };
      setPing(!ping);
    }) ;
    
  }


  return (
    <div className='login'>
      <ToastContainer />
        <img src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' className='login-logo' alt='Facebook'/>
         <div className="login-container">
           <h3>Log In To Facebook</h3>
           <form>
             <center>
               <input type="email" placeholder='Email Adresss' onChange={(e)=>setEmail(e.target.value)} />
               </center>
               <center>
               <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
               </center>
               <center>
               <button type='submit' className='login-login' onClick={login}>
                 Log IN
               </button>
               </center>
               <center>
                 <div className="sideinfo">
                   <h5>Forgotten Password?</h5>
                   <h5 className='dot'>.</h5>
                   <Link to="/register" style={{textDecoration:"none"}}>
                        <h5 className="rtd">Sign up For Facebook</h5>
                   </Link>
                 </div>
               </center>
             
           </form>
         </div>
        </div>
  )
}

export default Login