import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Header from './Header'
import SideBarOnly from './SideBarOnly'




const Sidebar = () => {
    const {logoutAdmin} = useContext(AuthContext)
    


   

  return (
    <div>
        <Header nav='' logout={logoutAdmin}/>

        <div className="flex ">

            <SideBarOnly/>
            
            <div className='w-full '>
               <Outlet/>
            </div>
      
        </div>
    </div>
  )
}

export default Sidebar
