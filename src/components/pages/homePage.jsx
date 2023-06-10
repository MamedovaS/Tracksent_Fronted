import React from 'react';
import './App.css';

const App = () => {
  const openMap = () => {
    window.open('public/infoPage.html');
  };

  return (
    <div className="App">
      <h2>list of fields</h2>
      <button className="MapButton" onClick={openMap}>
        Open info
      </button>
      <button className="MapButton" onClick={openMap}>
        Open info
      </button>
      <button className="MapButton" onClick={openMap}>
        Open info
      </button>
    </div>
  );
};

export default App;