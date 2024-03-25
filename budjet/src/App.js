import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Home from './components/home.js'; 
import Main from './components/main.js'; 
import Nav from './components/navbar.js'; 

function App() {
  return (
    <Router> 
      <div className="app"> {/* Add the 'app' class to the main container */}
        <Nav />
        <div className="content"> {/* Wrap the content in a container */}
          <Routes>
            <Route path="/Home" element={<Home />} /> 
            <Route path="/Main" element={<Main />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
