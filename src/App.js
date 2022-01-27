import './Styles/App.css';
import './Styles/hyperlinks.css'
import './Styles/slider.css';
import './Styles/hamburger-menu.css';
import react, { useState, useEffect } from 'react';
import Pathfinder from './Pathfinder/Pathfinder.jsx';

function getCurrentScreenSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  return width + " * " + height;
}

function App() {
  //Darkmode
  const storedDarkMode = localStorage.getItem("DARK_MODE");
  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const toggleDarkMode = () => setDarkMode(darkMode ? false : true);
  useEffect(() => {
    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);

  return (
    <body data-theme={darkMode ? "light" : "dark"}>
      <div className="header">
        Pathfinder v0.6.2
        {/* Hamburger-Menü */}
        <div className="hamburger-menu">
          <input id="menu__toggle" type="checkbox" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul class="menu__box">
            {/* Darkmode-Slider */}
            <div id="slider">
              <label class="switch">
                <input type="checkbox" onClick={toggleDarkMode}></input>
                <span class="slider round"></span>
              </label>
            </div>
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
