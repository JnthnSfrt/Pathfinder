import './Styles/App.css';
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
    <div className="App" data-theme={darkMode ? "dark" : "light"}>
      <header className="App-header">
        Pathfinder v0.6
        <button className="DarkModeToggle" onClick={toggleDarkMode}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </header>
      <Pathfinder />
      <div>
        {getCurrentScreenSize()}
      </div>
    </div>
  );
}

export default App;
