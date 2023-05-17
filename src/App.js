import './App.css';
import React, {useState} from 'react'
import Game from './components/Game/Game';
import { Button } from '@mui/material';
function App() {
  const [gameState, setGameState] = useState('start')
  return (
    <div className="App">
      { gameState === 'start' &&
        <>
          <div>Weclome to <b>Word Bridge!</b></div>
          <div className='sub-header'>You will get a handful of letters. Put together words to make your way across to the next level! But you better hurry before the time runs out</div>
          <Button variant="outlined" onClick={function(){setGameState('playing')}}>START</Button>
        </>
        }
        {gameState === 'playing' &&
          <Game></Game>
        }
    </div>
  );
}

export default App;
