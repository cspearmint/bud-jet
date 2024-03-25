import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "@fontsource/inter"; // Import fontsource/inter
import "@fontsource/inter/400.css"; // Import fontsource/inter CSS
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from './components/home.js'; 
import Main from './components/main.js'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
