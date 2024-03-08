import React from "react";
import "./Logincard.css";
import Heading from "./Heading";
import Textbox from "./Textbox";
import Checkbox from "./Checkbox";
import Loginbutton from "./Loginbutton";
import { Link } from 'react-router-dom';

/*Fix responsiveness to change in vertical window size*/

const Logincard = () => {
    return (
        <div className = "login_card">
            <div className = "login_card-container">
                <Heading text="Login"></Heading>
                <div className = "login_card-container-text">
                    <p className = "login_card-container-text-p1">Don't have an account yet? <Link to="/Signup" class="highlighted-text">Sign up!</Link></p>
                    <div className = "login_card-container-text-textboxes">
                        <p className = "login_card-container-text-textboxes-p3">Email Address:</p>
                        <Textbox />
                        <p className = "login_card-container-text-textboxes-p3">Password:</p>
                        <Textbox />
                    </div>
                    <Checkbox />
                    <Loginbutton text="Login" />
                </div>
            </div>
        </div>      
);
  };
  
  export default Logincard;