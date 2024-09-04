// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inventory, setInventory] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/csgo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }

      const data = await response.json();
      setMessage(data.message || data.error);

      if (data.inventory) {
        setInventory(data.inventory);
      }
    } catch (error) {
      console.error('There was an error:', error);
      setMessage('Failed to connect or retrieve inventory.');
    }
  };

  return (
    <div>
      <h1>Connect to CS:GO</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Steam Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Steam Password"
        />
        <button type="submit">Connect</button>
      </form>
      {message && <p>{message}</p>}
      {inventory.length > 0 && (
        <div>
          <h2>Your Inventory</h2>
          <ul>
            {inventory.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - Paint Index: {item.paintIndex} - Wear: {item.wear} - Custom Name: {item.customName} - Tradable After: {item.tradableAfter}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
