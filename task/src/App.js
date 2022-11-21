import './App.css';
import React from 'react';
import Home from './component/home';
import User from './component/user';
import Login from './component/login';
import Attendance from './component/attendance';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <>
   {/* <Home/>
   <User/> */}
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/user" element={<User/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/attendance" element={<Attendance/>}/>

   </Routes>
   </BrowserRouter>
    </>
   
  );
}

export default App;
