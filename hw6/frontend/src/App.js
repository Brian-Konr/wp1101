import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const handleGuess = () => {
    console.log("handleGuess");
  }
  const startMenu = <div>
    <button onClick={() => console.log("hello")}>start game</button>
  </div>

  const gameMode = <>
    <p>Guess a number between 1 to 100</p>
    <input></input>
    <button onClick={handleGuess} disabled={!number}>guess!</button>
    <p>{status}</p>
  </>
  return (
    <div className="App">
      {startMenu}
      {gameMode}
    </div>
  );
}

export default App;
