import './App.css';
import Pathfinder from './Pathfinder/Pathfinder';

function getCurrentScreenSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  return width + " * " + height;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Pathfinder v0.5
      </header>
      <Pathfinder />
      <div>
        {getCurrentScreenSize()}
      </div>
    </div>
  );
}

export default App;
