import { Navigate, Route,Routes } from 'react-router-dom'
import React ,{useContext} from 'react';
import AuthContext from '../context/AuthContext';




const PrivateRoute = ({children,path,...rest}) =>{
    let {user} = useContext(AuthContext)
    

if(user){
    return(
        <Routes>
        <Route {...rest}> {children}</Route>
        </Routes>
    )
    }else{return <Navigate to={path}  />}
    }
    // <Route path="/auth" element={this.state.token ? <Navigate to="/competition" /> : AuthPage}



export default PrivateRoute