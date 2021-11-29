import './Styles/App.css';
import './Styles/slider.css';
import react, { useState, useEffect } from 'react';
import Pathfinder from './Pathfinder/Pathfinder';

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
    <body>
      <div className="App" data-theme={darkMode ? "light" : "dark"}>
        <header className="App-header">
          <div id="empty"></div>
          <div id="title">Pathfinder Version 0.6.2</div>
          <div id="slider">
            <label class="switch">
              <input type="checkbox" onClick={toggleDarkMode}></input>
              <span class="slider round"></span>
            </label>
          </div>
        </header>
        <div class="content">
          <Pathfinder />
        </div>
        <footer class="footer">
        </footer>
      </div>
    </body>
  );
}

export default App;
