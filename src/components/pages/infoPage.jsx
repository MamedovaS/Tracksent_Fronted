import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [editableText, setEditableText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('editableText');
    if (savedText) {
      setEditableText(savedText);
    }
  }, []);

  const handleTextChange = (event) => {
    setEditableText(event.target.value);
  };

  const saveChanges = () => {
    localStorage.setItem('editableText', editableText);
    alert('Changes saved!');
  };

  const openMap = () => {
    window.open('public/map.html');
  };

  return (
    <div className="App">
      <h2>Info of field</h2>
      <textarea
        id="editableText"
        value={editableText}
        onChange={handleTextChange}
      ></textarea>
      <textarea
        id="editableText"
        value={editableText}
        onChange={handleTextChange}
      ></textarea>
      <textarea
        id="editableText"
        value={editableText}
        onChange={handleTextChange}
      ></textarea>
      <br />
      <button onClick={saveChanges}>Save</button>

      <button className="MyButton" onClick={openMap}>
        Open Map
      </button>
    </div>
  );
};

export default App;