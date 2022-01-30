import './Styles/App.css';
import './Styles/hyperlinks.css'
import './Styles/slider.css';
import './Styles/Sidebar.css';
import react, { useState, useEffect } from 'react';
import Pathfinder from './Pathfinder/Pathfinder.jsx';

function getCurrentScreenSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  return width + " * " + height;
}

function App() {

  return (
    <body data-theme={darkMode ? "light" : "dark"}>
      <div className="header">
        Pathfinder v0.6.2
        {/* Hamburger-Menü */}
        <div className="Sidebar">
          <input id="menu__toggle" type="checkbox" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul class="menu__box">
            <button class="menu__item" onClick=
              {() => this.setStartNode()}>Set start node</button>
            <button class="menu__item">ist</button>
            <button class="menu__item">ein</button>
            <button class="menu__item">Test.</button>
            Dimension: <span id="dimension">{window.innerWidth} * {window.innerHeight}</span>
          </ul>
        </div>
      </div>
      <div className="content">
        <Pathfinder />
      </div>
    </body>
  );
}

export default App;
