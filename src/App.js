import React, {useState, useEffect} from 'react';
import Intro from './components/intro'
import GameLayout from './components/root'
import Extreme from './components/extreme'
import Loading from './components/loading'
import SoundComponent from './components/sound';
import './game.css'
import './matrix.css'
import SoundsManager from './components/soundsManager';

function App() {

  const [currentGame, setCurrentGame] = useState({
    game: '',
    record: (localStorage.getItem('simonsays') ? JSON.parse(localStorage.getItem('simonsays')).record: 0),
    currentPoints: 0,
    active: 'intro-frame'
  });

  const soundsM = new SoundsManager();

  const updateRecord = (newValue) => {
    setCurrentGame({
      ...currentGame,
      record: newValue
    })
  }

  const updateActiveFrame = (frame) => {
    setCurrentGame({
      ...currentGame,
      active: frame
    })
  }

  const selectGame = (option) => {
    setCurrentGame({
      ...currentGame,
      game: option
    })
  }

  useEffect(() => {
    if (currentGame.active === 'intro-frame') {
      soundsM.fadeSound(true, soundsM.bgIntroSound)
      soundsM.fadeSound(false, soundsM.bgGameSound)
    } else {
      soundsM.fadeSound(false, soundsM.bgIntroSound)
      soundsM.fadeSound(true, soundsM.bgGameSound)
    }
   
  }, [currentGame.active, soundsM])

  return (
    <div>
      <SoundComponent gameState={currentGame} sounds={soundsM}/>
      
      <Loading />
      
      <div className={currentGame.active + ' intro-block generic-block' }>
        <Intro 
            selectGame={selectGame}
            sounds={soundsM}
            updateActiveFrame={updateActiveFrame} />
      </div>
      <div className={currentGame.active + ' game-block generic-block'}>
        <GameLayout gameState={currentGame} 
            updateRecord={updateRecord}
            sounds={soundsM}
            updateActiveFrame={updateActiveFrame}           
            />
      </div>
      <div className={currentGame.active + ' extreme-block generic-block'}>
        <Extreme gameState={currentGame} 
            updateRecord={updateRecord}
            sounds={soundsM}
            updateActiveFrame={updateActiveFrame}           
             />
      </div>
    </div>
  );
}

export default App;
