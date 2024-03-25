import React from "react";
import "./Signup.css";
import BannerImage from "../Assets/login_image.png";
import Signupcard from "./Signupcard";

const Signup = () => {
    return (
        <div className = "signup-container">
            <div className="signup-container-columns">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", placeItems: 'center', gridGap: 30, height: '100vh' }}>
                    <Signupcard />
                    <div className = "signup-container-columns-2">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <img src={BannerImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Signup;