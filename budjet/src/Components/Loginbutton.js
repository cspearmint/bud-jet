import React from 'react';
import "./Loginbutton.css";


const Loginbutton = ({ text }) => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="button-container">
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default Loginbutton;

