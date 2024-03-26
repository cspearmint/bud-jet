import React from "react";
import "./Logincard.css";
import Heading from "./Heading";
import Textbox from "./Textbox";
import Checkbox from "./Checkbox";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; 

const Logincard = () => {
    return (
        <div className="login_card">
            <div className="login_card-container">
                <Heading text="Login" />
                <div className="login_card-container-text">
                    <p className="login_card-container-text-p1">Don't have an account yet? <Link to="/Signup" className="highlighted-text">Sign up!</Link></p>
                    <div className="login_card-container-text-textboxes">
                        <p className="login_card-container-text-textboxes-p3">Email Address:</p>
                        <Textbox />
                        <p className="login_card-container-text-textboxes-p3">Password:</p>
                        <Textbox />
                    </div>
                    <Checkbox />
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Logincard;
