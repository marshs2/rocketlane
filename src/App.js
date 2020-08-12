import React from 'react';
// import logo from './logo.svg';
import './App.css';

import Header from './Header/Header';
// import SideBar from './SideBar/SideBar';
import Listing from './Listing/Listing';

function App() {
  return (
    <div className="App">
      {/*Header*/}
      <Header />

      <Listing style={{padding: '60px'}}/>
    </div>
  );
}

export default App;
