import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Logo from '../images/piggyBank.png';
import './home.css'; 
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <div className="home-container">
      <img src={Logo} alt="Budget Logo" />
      <h1>Welcome to Bud-Jet.</h1>
      <p>College students best budgeting partner</p>
      <Link to="/main" className="get-started-button">
        <Button variant="contained" style={{backgroundColor: '#FF684F', color: 'white'}} size = "large">
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default Home;
