import React from 'react';
import rocketlane from '../assets/rocketlane.svg';

import './Header.css';

export default class Header extends React.Component {

    render() {
     return (
        <header className="main-header"> 
            {/* Rocketlane Image*/}
            <img className="logo" src={rocketlane} alt="Rocketlane Logo" height="60" width="15%"/>

            {/*Rocketlane Application Name*/}
            <h1 className="application-name">Listing</h1>
        </header>
      )
    }
}