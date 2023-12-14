import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  //variables


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Websocker logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Image upload with Form Data</h1>
      <div className="card">
        <p>
          <button onClick={sendMessage}>Upload</button>
        </p>
      </div>
      {payload.map((message, index) => (
        <div key={index}>
          <p><b>{message.username}:</b> <code>{message.text}</code></p>
        </div>
      ))}
    </>
  );
}

export default App;
