import './Styles/App.css';
import './Styles/slider.css';
import Pathfinder from './Pathfinder/Pathfinder';
import react, { useState, useEffect } from 'react';

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
    <div className="App" data-theme={darkMode ? "light" : "dark"}>
      <header className="App-header">
        Pathfinder Version 0.6.1
      </header>
      <Pathfinder />
      <label class="switch">
        <input type="checkbox" onClick={toggleDarkMode}></input>
        <span class="slider round"></span>
      </label>
      <div id="footer">
        <div>
          {getCurrentScreenSize()}
        </div>

      </div>
    </div>
  );
}

export default App;
