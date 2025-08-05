import React from 'react'
import Navbar from '../Navbar/Navbar'
import './About.css'
import pic from '../assets/—Pngtree—cartoon character learning notepad illustration_6363446.png'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div className='about'>

      <Navbar/>
      
      
      <div className="main-box">
       
        <div className="text-content">
       Welcome to Notes App – your personal space for organizing thoughts, ideas, 
        </div>
        <div className="image">
          <img src={pic} alt="Image of character" />
        </div>
      </div>


      <div className="second-box">
        <h1>Why Use This App?</h1>
       <ul>
        <li>Lightweight and easy to use.</li>
        <li>No complex features – just what you need.</li>
        <li>All your notes stored securely in one place.</li>
        <li>Perfect for students, professionals, and anyone who loves staying organized.</li>
       </ul>
      </div>

      <div className="third-box">


        <h1>If you have feedback or suggestions, feel free to reach out.
            We’re constantly working to improve the experience and add more helpful features.

          </h1>

           <h3>Give your feedback <NavLink to="https://portfolio-zh3k.onrender.com" > here</NavLink></h3>

           <h1 className='last-heading' >Thank you for using Notes App</h1>
      </div>





      

      

      
      
    </div>
  )
}

export default About
