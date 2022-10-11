import React, { useContext } from 'react'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'


const HomePage = () => {
  let {logoutUser} = useContext(AuthContext)
    console.log('hello')
  return (
    
    <div >
      
      <div style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1437419764061-2473afe69fc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')",
            }} className=" min-h-screen ">
             <Header logout={logoutUser} nav = '/userBooking'/>
             
            </div>
        
        
        
    </div>
  )
}

export default HomePage
