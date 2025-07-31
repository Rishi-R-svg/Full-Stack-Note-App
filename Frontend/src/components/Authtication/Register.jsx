import React, { useState } from 'react'
import './Auth.css'

import Navbar from '../Navbar/Navbar.jsx'
import { Navigate, NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../Services/Axios.js'
import toast from 'react-hot-toast'



const Register = () => {



  
  const successToastStyling = {
   className: 'toast-style-success',
   icon: ''

  }

  const errorToastStyling = {
   className: 'toast-style-error',
   icon: ''

  }


const navigate = useNavigate()


const [type,setType] = useState(false)



  const {register,reset,  handleSubmit, formState:{errors,isSubmitting}} = useForm()

const onsubmit = async (data)=> {
  console.log(data)



 try {
  const response = await registerUser(data)

  const result = response.data

 
  

  toast.success('SignUp Complete',successToastStyling)

   

  if (response.status==201 || response.status==200) {
    navigate('/login')
  }

  console.log(result)
  


  



 } catch (err) {
   console.log(err)
   toast.error('Failed to create ',errorToastStyling)

 }

  

  reset();
}


const handleType = ()=> {
  if (type===false) {
    setType(true)
  }
  else {
    setType(false)
  }

  
}



  return (
    <div className='login' >
       <Navbar/>
      <div className="login-form">
      
        <form onSubmit={handleSubmit(onsubmit)}> 
        
          <label htmlFor="username">  UserName: <br/> 
            <input type="text" {...register('username', {required:true, minLength:5,maxLength:10})}            className={errors.username?'login-username-error':''}     />
          </label>
        
          <label htmlFor="email">  Email: <br/>
            <input type="email" {...register('email', {required:true, minLength:5, maxLength:30})}                className={errors.email?'login-email-error':''}     />
          </label>
          <label htmlFor="password"> Password : <br />
            <input type={type? 'text' : 'password'}               {...register('password', {required:true, minLength:5})} className={errors.password?'login-password-error pass-input':'pass-input'}/>
            <div className="showbtn"  onClick={handleType} >  {type?'Hide':'Show'} </div>
          </label>
          <button type='submit' disabled={isSubmitting}> {isSubmitting? 'Submitting...':'Sign Up'} </button>
           <p>Already a user? then <NavLink to='/login'>Login</NavLink></p>
        </form>
      </div> 
    </div>
  )
}

export default Register
