import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import './Navbar.css'
import user from '../assets/user-svgrepo-com.svg'
import logout from '../assets/logout-svgrepo-com.svg'


const Navbar = () => {

  const navigate = useNavigate()
  
 



const [username, setUsername] = useState('Guest')


const logoutHandler = ()=> {
  localStorage.clear('userdata')


 

  navigate('/login')
}


useEffect(()=>{
  const userSavedData = JSON.parse(localStorage.getItem('userdata'))

 

  if (userSavedData) {
    setUsername(userSavedData.user)
  }
  else {
    setUsername('Guest')
  }

},[])


  return (
    <div className='navbar'>
      <div className="logo">NoteApp</div>
      <ul className='first-menu'>
       <NavLink to='/'>Home</NavLink>
       <NavLink to='/notes' >Notes</NavLink>
       <NavLink to='/about'>About</NavLink>
       
       
      
      </ul>
      <ul className='second-menu'>
       <NavLink to='/'><i className="fa-solid fa-house"></i></NavLink>
       <NavLink to='/notes' ><i className="fa-solid fa-notes-medical"></i></NavLink>
       <NavLink to='/about'><i className="fas fa-building"></i>
</NavLink>
       
       
      
      </ul>
     
     <div className="user-box">
      <div className="user-image"><img src={user} alt="user svg" /></div>
      <div className="name"> {username} </div>
      <div className="log-out" title='log out'  onClick={logoutHandler} ><img src={logout} alt="logout svg" /></div>
     </div>

    
    
    </div>
  )
}

export default Navbar


