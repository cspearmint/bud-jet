import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Signupcard.css";
import Heading from "./Heading";
import Button from '@mui/material/Button'; 

// holds values in textbox
const Textbox = ({ value, onChange, type = 'text', placeholder }) => (
    <div className="textbox-container">
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="textbox-container-input"
            placeholder={placeholder}
        />
    </div>
    );

const Signupcard = () => {
    // stores email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // update based on user's input
    const emailChange = (e) => {
        setEmail(e.target.value);
    }
    const passChange = (e) => {
        setPassword(e.target.value);
    }

    // user submits
    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (
        <div className="signupcard">
            <div className="signupcard-container">
                <Heading text="Sign Up" />
                <form onSubmit={handleSubmit}>
                    <div className="signupcard-container-text">
                        <p className="login_card-container-text-p1">Already have an account? <Link to="/Login" className="highlighted-text">Login</Link></p>
                        <div className="signupcard-container-text-textboxes">
                            <p className="signupcard-container-text-textboxes-p3">Email Address:</p>
                            <Textbox 
                                value={email} 
                                onChange={emailChange} 
                                type="email" 
                                placeholder="Enter your email" 
                            />
                            <p className="signupcard-container-text-textboxes-p3">Password:</p>
                            <Textbox 
                                value={password} 
                                onChange={passChange} 
                                type="password" 
                                placeholder="Enter your password" 
                            />
                        </div>
                        <Button type="submit" variant="contained" style={{
                            backgroundColor: '#FF684F',
                            color: 'white',
                            width: '100%',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            borderRadius: '15px',
                            marginTop: '10px',
                            cursor: 'pointer',
                            alignSelf: 'center',
                            '&:hover': {
                            backgroundColor: '#F47C7C',
                            },
                        }}>
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signupcard;
