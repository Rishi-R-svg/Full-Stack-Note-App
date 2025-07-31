
import './App.css'




import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Hero from './components/hero/Hero'
import Login from './components/Authtication/Login.jsx'
import Register from './components/Authtication/Register.jsx'
import About from './components/about/About.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Landing from './components/Landling/Landing.jsx'

import toast,{Toaster} from 'react-hot-toast'


const auth = JSON.parse(localStorage.getItem('userdata'))





const routePaths = createBrowserRouter([
  {
    path : '/',
    element: <Landing/>
  },
  {
    path : '/notes',
    element: <Hero/>
  },
  {
    path : '/about',
    element: <About/>
  },
  {
    path : '/register',
    element: <Register/>
  },
  {
    path : '/login',
    element: <Login/>
  }


])



function App() {



 

  return (
    <div className='app'>
      <RouterProvider  router={routePaths}/>
      <Toaster/>
     
    </div>
  )
}

export default App
