import React from 'react';

import './SideBar.css';

export default class SideBar extends React.Component {

    render() {
     return (
        //  Dummy Nav links 
        <aside>
            <nav>
            <a href="http://www.rocketlane.com" target="_blank" rel="noopener noreferrer"> <p>About Us</p> </a>
            <a href="http://www.rocketlane.com" target="_blank" rel="noopener noreferrer"> <p>Founders</p> </a>
            <a href="http://www.rocketlane.com" target="_blank" rel="noopener noreferrer"> <p>Mission</p> </a>
            <a href="http://www.rocketlane.com" target="_blank" rel="noopener noreferrer"> <p>Customer</p> </a>
            </nav>
        </aside>
      )
    }

}