import React from 'react';
import rocketlane from '../../assets/rocketlane.svg';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = (props) => {

     return (
        <header className="main-header"> 
            {/*Header Logo*/}
            <Link to="/" className="header-continer">
                <img className="logo" src={rocketlane} alt="Rocketlane Logo"/>
            </Link>

            {/*Rocketlane Application Name*/}
            <h1 className="application-name">Listing</h1>
        </header>
      )
}

export default Header;