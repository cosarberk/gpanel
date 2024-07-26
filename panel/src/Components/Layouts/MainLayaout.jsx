import React from 'react'
import { SideBar } from '../SideBar/SideBar'
import { useOutlet } from 'react-router-dom'

export function MainLayaout() {
  const outlet = useOutlet()

  return (
    <div style={{display:"flex",width:"100%",height:"100vh",backgroundImage:"url('/background.jpg')",
      backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat",
      margin:0,padding:0,border:0,position:"relative",top:0,left:0
    }} >
      <div style={{display:"flex",width:"100%",height:"100vh",position:"absolute",zIndex:5,backgroundColor:"rgba(0, 0, 0, 0.4)",backdropFilter:"blur(60px)"}} >

   
      {outlet}


      </div>
   
    </div>
  )
}

