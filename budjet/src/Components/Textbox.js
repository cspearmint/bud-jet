import React, { Component } from 'react';
import "./Textbox.css";

class Textbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '', // Initialize with an empty value
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };

    render() {
        return (
            <div className = "textbox-container">
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    className = "textbox-container-input"
                />
            </div>
        );
    }
}

export default Textbox;