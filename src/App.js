import './Styles/App.css';
import './Styles/hyperlinks.css'
import './Styles/slider.css';
import Pathfinder from './Pathfinder/Pathfinder.jsx';

function App() {

  return (
    <body>
      <div className="header">
        Pathfinder v0.6.2
      </div>
      <div className="content">
        <Pathfinder />
      </div>
    </body>
  );
}

export default App;
