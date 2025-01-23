// App.js
import React, { useState, useEffect } from 'react';
import { getClipboardData, syncClipboardData } from './api';

function App() {
  const [clipboardData, setClipboardData] = useState([]);

  useEffect(() => {
    getClipboardData().then(data => setClipboardData(data));
    const sync = syncClipboardData(newData => setClipboardData(prevData => [...prevData, newData]));
    return () => sync.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Clipboard Tool</h1>
      <ul>
        {clipboardData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;