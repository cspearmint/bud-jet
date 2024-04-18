import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Logincard.css";
import "./Loginbutton.css";
import Heading from "./Heading";
import Textbox from "./Textbox";
import Checkbox from "./Checkbox";
import Button from '@mui/material/Button'; 

const Logincard = () => {
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
        const handleSubmit = async (event) => {
            event.preventDefault(); 
            console.log("Email: ", email);
            console.log("Password: ", password);
            try {
                const response = await axios.post('http://localhost:3001/login', {
                    username: email,
                    password: password
                });
                console.log('Login successful:', response.data);
		const cookieValue = response.data;
                document.cookie = `budjetCookie=${cookieValue}; path=/`;
		let storedCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('budjetCookie'));
		storedCookie = storedCookie ? storedCookie.split('=')[1] : null;
		console.log('Cookie as retrieved: ', storedCookie);
            	// Redirect after successful login
		window.location.href = '/Main';
            } catch (error) {
                console.error('Login failed:', error);
                // Handle login failure
            }
        }

    return (
        <div className="login_card">
            <div className="login_card-container">
                <div className = "login_card-container-heading">
                    <Heading text="Login" />
                </div>
                <form onSubmit={handleSubmit}>
                <div className="login_card-container-text">
                    <p className="login_card-container-text-p1">Don't have an account yet? <Link to="/Signup" className="highlighted-text">Sign up!</Link></p>
                    <div className="login_card-container-text-textboxes">
                        <p className="login_card-container-text-textboxes-p3">Email Address:</p>
                        <Textbox 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                        />
                        <p className="login_card-container-text-textboxes-p3">Password:</p>
                        <Textbox 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                        <Button type="submit" variant="contained" style={{
                            backgroundColor: '#FF684F',
                            color: 'white',
                            width: '100%',
                            padding: '10px 30px',
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
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Logincard;

