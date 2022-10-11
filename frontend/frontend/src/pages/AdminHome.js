import React, { useContext } from "react";
import {  BrowserRouter as Router,Route, Routes } from "react-router-dom";
import ApprovedList from "../components/ApprovedList";
import DeclinedList from "../components/DeclinedList";
import Header from "../components/Header";
import PendingList from "../components/PendingList";
import Sidebar from "../components/Sidebar";
import AuthContext, { AuthProvider } from "../context/AuthContext";

const AdminHome = () => {
 
  return (
    <div>
      <Router>
      <AuthProvider>
     <Routes>
     <Route exact path="/admins"  element= {<Sidebar/>}>

<Route  path="pendinglist"  element= {<PendingList/>}/>
<Route  path="appeovedlist"  element= {<ApprovedList/>}/>
<Route  path="declinedlist" element = {<DeclinedList/>}/>
</Route>
</Routes>
</AuthProvider>
</Router>
     
    </div>
  );
};

export default AdminHome;
