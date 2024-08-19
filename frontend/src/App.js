import React, { useEffect, useState } from 'react';
import './styles/globals.css';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data.message));
  }, []);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export default App;
