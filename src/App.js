import React, {useState, useEffect, useReducer} from 'react';
import Intro from './components/intro'
import GameLayout from './components/root'
import Extreme from './components/extreme'
import Loading from './components/loading'
import SoundComponent from './components/sound';
import './game.css'
import './matrix.css'
import SoundsManager from './components/soundsManager';


const initialState = {
  game: '',
  record: (localStorage.getItem('simonsays') ? JSON.parse(localStorage.getItem('simonsays')).record: 0),
  currentPoints: 0,
  isPlayingMusic: false,
  active: 'loading-frame',
  gameType: '',
  muted: false,
  currentState: 'loading'
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        active: 'loading-frame',
        currentState: 'loading' 
      }
      case 'INTRO':
        return {
          ...state,
          active: 'intro-frame',
          currentState: 'intro'
        }
      case 'OVERLOAD':
        return {
          ...state,
          active: 'game-frame',
          currentState: 'overload' 
        }
      case 'EXTREME':
        return {
          ...state,
          active: 'extreme-frame',
          currentState: 'extreme' 
        }
      case 'RECORD':
        return {
          ...state,
          record: action.recordValue
        }
      case 'MUTE':
        return {
          ...state,
          muted: action.muted
        }  
    default:
      return state;
  }
}

const soundsM = new SoundsManager();

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);
  
  
  useEffect(() => {
    if (store.currentState === 'intro') {
      if (!store.muted) {
        soundsM.playSound(false, soundsM.bgGameSound)
        soundsM.playSound(true, soundsM.bgIntroSound)       
      } else {
        soundsM.playSound(false, soundsM.bgIntroSound)
      }
    } else if (store.currentState === 'overload' || store.currentState === 'extreme') {
      if (!store.muted) {
        soundsM.playSound(false, soundsM.bgIntroSound)
        soundsM.playSound(true, soundsM.bgGameSound)
      } else {
        soundsM.playSound(false, soundsM.bgGameSound)
      }
    }
  }, [store.currentState, store.muted])

  const componentToShow=()=> {
    const option = store.active;
    
    if (option === 'game-frame') {
      return <GameLayout
          sounds={soundsM}
          store={store}
          dispatch={dispatch}
          />
    } else if (option === 'extreme-frame') {
      return <Extreme 
            sounds={soundsM}
            store={store}
            dispatch={dispatch}
          />
    } else if (option === 'loading-frame'){
      return <Loading dispatch={dispatch} soundsM={soundsM} />
    } else {
      return <Intro  
            sounds={soundsM}
            store={store}
            dispatch={dispatch}
           />;
    }
  }

  return (
    <div>
      <SoundComponent dispatch={dispatch}/>
      <div className='generic-block'>
        {componentToShow()}
      </div>
      
    </div>
  );
}

export default App;
