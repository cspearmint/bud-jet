import React from "react";
import "./Heading.css";

function Heading({ text }) {
    return (
        <div className = "heading-container-large">
            <h1 className="heading-container-large-contents">
                {text}
                <div className = "heading-container-large-underline"></div>
            </h1>

        </div> 
    );
  }
  
  export default Heading;