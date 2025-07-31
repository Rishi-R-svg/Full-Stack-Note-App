import React, { useState } from 'react'
import './Toast.css'




const Toast  = ({text, bgColor,defilnedClass}) => {
    
   

   

 


  return (


    <div className={defilnedClass}
    style={{background:bgColor}}
    >
      <h1>{text} </h1>
    </div>
  )
}

export default Toast 
