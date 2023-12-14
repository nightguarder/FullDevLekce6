import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  //variables
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [payload, setPayload] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = (event) => {
      setPayload((oldPayload) => [...oldPayload, JSON.parse(event.data)]);
    };
    setWs(socket)
    return () => {
      if (socket.readyState == 1) {
      socket.close()
      }
    }
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ username, text: message }));
      setMessage('');
    }
  };

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
      <h1>WebSocker + React</h1>
      <div className="card">
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
        <p>
          <button onClick={sendMessage}>Send</button>
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
