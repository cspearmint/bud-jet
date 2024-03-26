import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import "@fontsource/inter"; 
import "@fontsource/inter/400.css"; 
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from './components/home.js'; 
import Main from './components/main.js';
import Navbar from './components/navbar.js'; 

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
