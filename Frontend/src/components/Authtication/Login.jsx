import React, { useState } from 'react'
import '../Media.css'
import './Auth.css'
import Navbar from '../Navbar/Navbar.jsx'
import { NavLink,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginUser } from '../Services/Axios.js'

import toast from 'react-hot-toast'
import { erroHandler } from '../utils/Error.Handler.js'






const Login = () => {


  const successToastStyling = {
   className: 'toast-style-success',
   icon: ''

  }

  const errorToastStyling = {
   className: 'toast-style-error',
   icon: ''

  }



  const navigate = useNavigate()

  const [type, setType] = useState(false)

  const {register,reset,  handleSubmit, formState:{errors,isSubmitting}} = useForm()

const onsubmit = async (data)=> {
  try {
    
    const response = await loginUser(data);

    const result = response.data;

    console.log(result)

    localStorage.setItem('userdata',JSON.stringify(result))

    toast.success(result.message, successToastStyling)

    if (response.status==201 || response.status==200) {
      

      navigate('/notes')


    }


  } catch (error) {
    toast.error(erroHandler(error),errorToastStyling)
  }

  


  reset();
}


const handleType = ()=>{
  if (type===false) {
    setType(true)
  }
  else {
    setType(false)
  }
}



  return (

    <div className='login'>
      <Navbar/>

      <div className="login-form">
        <form onSubmit={handleSubmit(onsubmit)}> 
        
          <label htmlFor="email"> Username or Email: <br/>
            <input type="email" {...register('email', {required:true, minLength:5})}            className={errors.email?'login-email-error':''}     />
          </label>
          <label htmlFor="password"> Password : <br />
            <input type={type? 'text':'password'}  {...register('password', {required:true, minLength:5})}            className={errors.email?'login-password-error pass-input':'pass-input'}     />
            <div className="showbtn"   onClick={handleType}   > {type?'Hide':'Show'} </div>
          </label>
          <button type='submit' disabled={isSubmitting}> {isSubmitting? 'Checking...':'Login'} </button>
           <p>New user? then <NavLink to='/register'>Register</NavLink></p>
        </form>
      </div> 
      
    </div>
  )
}

export default Login
