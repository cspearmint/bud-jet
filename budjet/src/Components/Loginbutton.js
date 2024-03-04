import React from 'react';
import "./Loginbutton.css";

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className = "button-container">
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default App;