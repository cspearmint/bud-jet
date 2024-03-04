import React from "react";
import "./Logincard.css";
import Heading from "./Heading";
import Textbox from "./Textbox";
import Checkbox from "./Checkbox";
import Loginbutton from "./Loginbutton";

/*Fix responsiveness to change in vertical window size*/

const Login = () => {
    return (
        <div className = "login_card">
            <div className = "login_card-container">
                <Heading text="Login"></Heading>
                <div className = "login_card-container-text">
                        <p className = "login_card-container-text-p1">Don't have an account yet? <span class="highlighted-text">Sign up!</span></p>
                        <div className = "login_card-container-text-textboxes">
                            <p className = "login_card-container-text-textboxes-p3">Email Address:</p>
                            <Textbox />
                            <p className = "login_card-container-text-textboxes-p3">Password:</p>
                            <Textbox />
                        </div>
                        <Checkbox />
                        <Loginbutton />
                </div>
            </div>
        </div>      
);
  };
  
  export default Login;