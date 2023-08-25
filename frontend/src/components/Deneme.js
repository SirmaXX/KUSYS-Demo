import React, { useState, useEffect } from 'react';



function Deneme() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div >
      <h1>React App</h1>
      <p>Message from FastAPI: {message}</p>
    </div>
  );
}





export default Deneme;
