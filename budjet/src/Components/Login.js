import React from "react";
import "./Login.css";
import BannerImage from "../Assets/login_image.png";
import Logincard from "./Logincard";

const Login = () => {
    return (
        <div className = "login-container">
            <div className="login-container-columns">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", placeItems: 'center', gridGap: 30, height: '100vh' }}>
                    <Logincard />
                    <div className = "login-container-columns-2">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <img src={BannerImage} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Login;
  

  <div className = "login-container-columns-1-container">
                            <p>login</p>
</div>