import './App.css';
import React, {Fragment} from 'react';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router,Route ,Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import SignUp from './pages/SignUp';
import UserBooking from './pages/UserBooking';
import AdminLogin from './pages/adminLoign';
import AdminHome from './pages/AdminHome';
import PendingList from './components/PendingList';

import ApprovedList from './components/ApprovedList';
import DeclinedList from './components/DeclinedList';

import Sidebar from './components/Sidebar';
import SlotBooking from './components/SlotBooking';

function App() {
  return (
    <div className="App">
      
      <Router>
      <AuthProvider>
      
      <Routes>
      
      <Route  exact path="/"   element={
      <PrivateRoute path = '/login'>
      <Route  path="/"  element= {<HomePage />}/>
      </PrivateRoute>}/>
      {/* understand the need of private route */}
      {/* <Route  exact path="/admins"   element={
      <PrivateRoute path = '/adminlogin'>
      <Route exact path="/admins"  element= {<Sidebar/>}>
        <Route  path="pendinglist"  element= {<PendingList/>}/>
        <Route  path="appeovedlist"  element= {<ApprovedList/>}/>
        <Route  path="declinedlist" element = {<DeclinedList/>}/>
      </Route>
      </PrivateRoute>}/>
       */}

      <Route  path="/login"  element= {<LoginPage />}/>
      <Route  path="/signup"  element= {<SignUp />}/>
      <Route  path="/userBooking"  element= {<UserBooking/>}/>
      <Route  path="/adminlogin"  element= {<AdminLogin/>}/>

      <Route exact path="/admins"  element= {<Sidebar/>}>

      <Route  path="pendinglist"  element= {<PendingList/>}/>
      <Route  path="appeovedlist"  element= {<ApprovedList/>}/>
      <Route  path="declinedlist" element = {<DeclinedList/>}/>
      <Route  path="bookingslot" element = {<SlotBooking/>}/>


      </Route>

      

     



      

      
      



      
      </Routes>
      

      </AuthProvider>
         
      </Router>
    </div>
  );
}

export default App;
