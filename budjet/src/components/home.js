import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Logo from '../images/piggyBank.png';
import './home.css'; 
import Button from '@mui/material/Button';
import Heading from "./Heading";


const Home = () => {
  return (
    <div className="home">
      <div className="home-imagecontainer">
        <img src={Logo} alt="Budget Logo" />
      </div>

      <div className = "home-container-welcome">
        <div className = "home-container-welcome-card">
          <Heading text = "Welcome to Budjet."></Heading>
          <p>A college student's best budgeting partner</p>
          <Link to="/main" className="get-started-button">
            <Button variant="contained" style={{backgroundColor: '#FF684F', color: 'white'}} size = "large">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

    
    </div>
  );
};

export default Home;