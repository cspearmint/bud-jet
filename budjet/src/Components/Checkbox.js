import React, { Component } from 'react';
import "./Checkbox.css";

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false, // Initialize with unchecked state
        };
    }

    handleCheckboxChange = () => {
        this.setState((prevState) => ({
            isChecked: !prevState.isChecked,
        }));
    };

    render() {
        return (
            <div className = "checkbox-container">
                
                    <input
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.handleCheckboxChange}
                        className = "checkbox-container-input"
                    />
                    <p>Remember Me</p>
                
            </div>
        );
    }
}
    
export default Checkbox;