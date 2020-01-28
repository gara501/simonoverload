import React, {useState, useEffect} from 'react';
import {Howl} from 'howler'
import Intro from './components/intro'
import GameLayout from './components/root'
import Loading from './components/loading'
import SoundComponent from './components/sound';
import './game.css'
import intro from './sounds/intro.wav';
import sound1 from './sounds/jump1.mp3';
import sound2 from './sounds/jump2.mp3';
import sound3 from './sounds/jump3.mp3';
import sound4 from './sounds/jump4.mp3';
import back from './sounds/back.wav';
import soundGameOver from './sounds/gameover.wav';

function App() {

  const [currentGame, setCurrentGame] = useState({
    game: '',
    record: (localStorage.getItem('simonsays') ? JSON.parse(localStorage.getItem('simonsays')).record: 0),
    currentPoints: 0,
    active: 'intro-frame'
  });

  const bgIntrosound =  new Howl({
    src: [intro],
    loop: true,
    onplayerror: function() {
      bgIntrosound.once('unlock', function() {
        bgIntrosound.play();
      });
    }
  });

  const bgGameSound =  new Howl({
    src: [back],
    volume: 0.5,
    loop: true,
    onload: () => {
    
    }
  });

  const topLeftSound =  new Howl({
    src: [sound1],
    onload: () => {
     
    }
  });

  const topRightSound =  new Howl({
    src: [sound2],
    onload: () => {
     
    }
  });

  const bottomLeftSound =  new Howl({
    src: [sound3],
    onload: () => {
      
    }
  });

  const bottomRightSound =  new Howl({
    src: [sound4],
    onload: () => {
      
    }
  });

  const goversound =  new Howl({
    src: [soundGameOver],
    onload: () => {
      
    }
  });

  const sounds = {
    activateSound: (option, sound) => {
      if (option) {
        sound.play();
        
      } else {
        sound.stop();
      }
    },
    fadeSound: (option, sound) => {
      if (option) {
        let isSound = sound.play();
        sound.fade(0, 1, 1000, isSound);
      } else {
        sound.stop();
      }
    },
    introSound: (option) => {
      sounds.fadeSound(option, bgIntrosound);
    },
    gameSound: (option) => {
      sounds.fadeSound(option, bgGameSound);
    },
    gameOverSound: (option) => {
      sounds.activateSound(option, goversound);
    },
    topLeftSound: (option) => {
      sounds.activateSound(option, topLeftSound);
    },
    topRightSound: (option) => {
      sounds.activateSound(option, topRightSound);
    },
    bottomLeftSound: (option) => {
      sounds.activateSound(option, bottomLeftSound);
    },
    bottomRightSound: (option) => {
      sounds.activateSound(option, bottomRightSound);
    }
  }

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
      sounds.introSound(true);
      sounds.gameSound(false);
    } else {
      sounds.introSound(false);
      sounds.gameSound(true);
    }
   
  }, [currentGame.active])

  return (
    <div>
      <SoundComponent gameState={currentGame} sounds={sounds} />
      
      <Loading />
      
      <div className={currentGame.active + ' intro-block generic-block' }>
        <Intro 
            selectGame={selectGame} 
            sounds={sounds}
            updateActiveFrame={updateActiveFrame} />
      </div>
      <div className={currentGame.active + ' game-block generic-block'}>
        <GameLayout gameState={currentGame} 
            updateRecord={updateRecord}
            updateActiveFrame={updateActiveFrame}           
            sounds={sounds} />
      </div>
    </div>
  );
}

export default App;
