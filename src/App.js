import './Styles/App.css';
import './Styles/slider.css';
import Pathfinder from './Pathfinder/Pathfinder.jsx';

function App() {

  return (
    <body>
      <div className="header">
        Pathfinder
      </div>
      <div className="content">
        <Pathfinder />
      </div>
      <div className="footer">
        <a className="github-link" href="https://github.com/JonathanSeifert/Pathfinder"
          title="Quellcode zur Applikation"
          target="_blank" rel="noreferrer">github.com/JonathanSeifert/Pathfinder</a>
      </div>
    </body>
  );
}

export default App;
