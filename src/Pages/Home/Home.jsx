import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { useMenu } from '../../context/MenuContext'
import Feed from '../../Components/Feed/Feed'

const Home = () => {
  const {menu}=useMenu()
  return (
    <>
    <Sidebar/>
    <div className={`container ${menu ? "large-container": ""}`}>
      <Feed/>
    </div>
   
    </>
  )
}

export default Home