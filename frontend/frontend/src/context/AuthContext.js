import { createContext,useState,useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


const AuthContext = createContext() 

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens,setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user,setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    let [ loading,setLoading] = useState(true)

    let navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('authTokens'))

    console.log('TOKEN', token);



    let loginUser = async(e ) => {
        e.preventDefault()
       
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{
            alert('something went wrong !')
        }

    }

    let loginAdmin = async(e ) => {
        e.preventDefault()
       
        let response = await fetch('http://127.0.0.1:8000/admins/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/admins/pendinglist')
        }else{
            alert('something went wrong !')
        }

    }

    let signupUser = async(e ) => {
        e.preventDefault()
       
        let response = await fetch('http://127.0.0.1:8000/api/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'fname':e.target.fname.value,'lname':e.target.lname.value,'username':e.target.username.value,'email':e.target.email.value,'password':e.target.password.value,'password_confirmation':e.target.password_confirmation.value})
        })
        
        if(response.status === 200){   
            navigate('/login')
        }else{
            alert('something went wrong !')
        }

    }

    let bookingUser = async(e ) => {
        e.preventDefault()
       
        let response = await fetch('http://127.0.0.1:8000/user/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token.access}`
            },
            body:JSON.stringify({'fullname':e.target.fullname.value,'phone':e.target.phone.value,'company_name':e.target.company_name.value,'city':e.target.city.value,'state':e.target.state.value,'email':e.target.email.value,'address':e.target.address.value})
        })
        
        if(response.status === 200){   
            navigate('/')
        }else{
            alert('something went wrong !')
        }

    }
    

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    let logoutAdmin = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/adminlogin')
    }

    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        }) 
        let data = await response.json() 
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))

        }else{
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
        bookingUser:bookingUser,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin,
        
    }
    

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        },fourMinutes)
        return()=> clearInterval(interval)
    },[authTokens,loading])


    return(
        <AuthContext.Provider value={contextData} >
            {children }
        </AuthContext.Provider>
    )
}