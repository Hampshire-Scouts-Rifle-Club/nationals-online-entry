import React from 'react';
import camping from './mockups/Camping.jpg';
import './Camping.css';

class Camping extends React.Component {
    render() {
        return (
            <div className="camping">
                <img src={camping} alt="Camping" />
            </div>
        );
    }
}

export default Camping;
