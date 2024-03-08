import React from "react";
import "./Signupcard.css";
import Heading from "./Heading";
import Textbox from "./Textbox";
import Loginbutton from "./Loginbutton";
import { Link } from 'react-router-dom';

/*Fix responsiveness to change in vertical window size*/

const Login = () => {
    return (
        <div className = "signupcard">
            <div className = "signupcard-container">
                <Heading text="Sign Up"></Heading>
                <div className = "signupcard-container-text">
                <p className = "login_card-container-text-p1">Already have an account? <Link to="/Login" class="highlighted-text">Login</Link></p>
                        <div className = "signupcard-container-text-textboxes">
                            <p className = "signupcard-container-text-textboxes-p3">Email Address:</p>
                            <Textbox />
                            <p className = "signupcard-container-text-textboxes-p3">Password:</p>
                            <Textbox />
                        </div>
                        <Loginbutton text="Sign Up" />
                </div>
            </div>
        </div>      
);
  };
  
  export default Login;