import './App.css';
import React, {useState} from 'react'
import Game from './components/Game/Game';

function App() {
  const [gameState, setGameState] = useState('start')
  return (
    <div className="App">
      <header className="App-header">
        { gameState == 'start' &&
        <>
          <div>Weclome to <b>Word Bridge!</b></div>
          <div className='sub-header'>You will get a handful of letters. Put together words to make your way across to the next level! But you better hurry before the time runs out</div>
          <button onClick={function(){setGameState('playing')}}>START</button>
        </>
        }
        {gameState == 'playing' &&
          <Game></Game>
        }
      </header>
    </div>
  );
}

export default App;
