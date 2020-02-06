import React from 'react';
import logo from './logo.svg';
import './App.css';

import shootersBlank from './mockups/Shooters-Blank.jpg';
import campHelpersBlank from './mockups/Camp-Helpers-Blank.jpg';
import camping from './mockups/Camping.jpg';
import emergencyContacts from './mockups/Emergency-Contacts.jpg';
import permissions from './mockups/Permissions.jpg';

let frontPageMockupUrls = [shootersBlank, campHelpersBlank, camping, emergencyContacts, permissions];

// [
//   "/mockups/Shooters-Blank.jpg",
//   "/mockups/Camp-Helpers-Blank.jpg",
//   "/mockups/Camping.jpg",
//   "/mockups/Emergency-Contacts.jpg",
//   "/mockups/Permissions.jpg"
// ];

function renderImage(imageUrl) {
    return (
      <div>
        <img src={imageUrl} alt=""/>
      </div>
    );
  }
  
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
      
        <div className="mockup-images">
          {frontPageMockupUrls.map(imageUrl => renderImage(imageUrl))}
        </div>
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
