import React from 'react';
import './Textbox.css'; 

const Textbox = ({ value, onChange, type = 'text', placeholder }) => {
    return (
        <div className="textbox-container">
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="textbox-container-input"
                placeholder={placeholder}
            />
        </div>
    );
};

export default Textbox;
