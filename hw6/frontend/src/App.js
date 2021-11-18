import React from 'react';
import { useState } from 'react';
import {guess, startGame, restart} from './axios'
import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');
  
  const handleStart = async () => {
    let data = await startGame();
    if(data.msg === 'The game has started.') setHasStarted(true);
  }
  const handleGuess = async () => {
    // backend to determine
    let data = await guess(number);
    if(data === 406) setStatus(`Error: ${number} is not a valid number (1 - 100)`)// handle out of range
    else if(data === 'Bigger' || data === 'Smaller'){
      setStatus(data);
    }
    else if(data === 'bingo') {
      setHasWon(true);
    }
  }

  const handleRestart = async () => {
    //reset backend
    let data = await restart();
    if(data.msg === 'The game has started.') {
      setHasWon(false);
      setStatus('');
    }
  }
  const startMenu = <div>
    <button onClick={handleStart}>start game</button>
  </div>

  const gameMode = <>
    <p>Guess a number between 1 to 100</p>
    <input onChange={(e) => setNumber(e.target.value)}></input>
    <button onClick={handleGuess} disabled={!number}>guess!</button>
    <p>{status}</p>
  </>

  const winningMode = <>
    <p>you won! the number was {number}</p>
    <button onClick={handleRestart}>restart</button>
  </>
  return (
    <div className="App">
      {hasStarted? (hasWon ? winningMode : gameMode) : startMenu}
    </div>
  );
}

export default App;
