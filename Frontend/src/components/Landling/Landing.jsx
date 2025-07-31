
import Navbar from '../Navbar/Navbar'
import './Landing.css'
import { Link, NavLink } from 'react-router-dom'
import '../Media.css'






const Landing = () => {

  const auth = JSON.parse(localStorage.getItem('userdata'))


  return (
    <div className='landing'>
    <Navbar/>


      <div className="landing-page-container">
       <h1>Capture every idea before it fades. Your thoughts deserve a home.</h1>

       {auth && <NavLink to='/notes'> See notes</NavLink> || !auth && <NavLink to='/login' >Get Started</NavLink>}
       {auth && <div className='more-content'>

       
        
        
         </div> || !auth && ''}
        
       
   
      </div>

    </div>
  )
}

export default Landing
