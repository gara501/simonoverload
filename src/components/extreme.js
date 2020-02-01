import React, {useState, useEffect, useRef} from 'react'
import SoundsManager from './soundsManager';
import { useKeyDown, useKeyCombo } from "react-keyboard-input-hook";

const initialExtremeState = {
    isRunning: false,
    gameState: 'loaded',
    points: 0,
    record: (localStorage.getItem('simonsaysExtreme') ? JSON.parse(localStorage.getItem('simonsaysExtreme')).record: 0),
    secuence: []
}

const Extreme = ({ side, dispatch, sounds, releaseSide }) => {

    const [isPressed, setIsPressed] = useState('');
    const [extremeState, setExtremeState] = useState(initialExtremeState)
    const [buttonsHidden, setButtonsHidden] = useState('');
    const [currentPoints, setCurrentPoints] = useState(0);
    const soundsM = new SoundsManager();
    const buttons = {
        B1: 'bl1',
        B2: 'bl2',
        B3: 'bl3',
        B4: 'bl4',
        B5: 'bl5',
        B6: 'bl6'
    }
    const refContainer = useRef();
    
    console.log('ESTATE', extremeState)
    useEffect(() => {
        if (extremeState.gameState === 'started') {
            console.log('state changed STARTED');
        }
        
      
    }, [extremeState])


    const handlePress = (e) => {
        let button = e.target;
        button.classList.add('hit')
        playSound(button);
        setTimeout(() => {
            button.classList.remove('hit')
        }, 100)
    }

    const playSound = (button) => {

        if (button.classList.contains(buttons.B1)) {
            soundsM.playSound(true, soundsM.b1Sound);
        }
        if (button.classList.contains(buttons.B2)) {
            soundsM.playSound(true, soundsM.b2Sound);
        }
        if (button.classList.contains(buttons.B3)) {
            soundsM.playSound(true, soundsM.b3Sound);
        }
        if (button.classList.contains(buttons.B4)) {
            soundsM.playSound(true, soundsM.b4Sound);
        }
        if (button.classList.contains(buttons.B5)) {
            soundsM.playSound(true, soundsM.b5Sound);
        }
        if (button.classList.contains(buttons.B6)) {
            soundsM.playSound(true, soundsM.b6Sound);
        }
    }

    const handleTouch = (e) => {
        e.target.classList.add('hit');
        playSound(e.target);
    }

    const cpuPlay= (secuence) => {
        const hits = secuence;
        const currentPoints = extremeState.points;
        const rand = Math.floor(Math.random() * 6) + 1;
        const blName = 'bl' + rand.toString();
        hits.push(blName);
        setExtremeState({
            ...extremeState,
            isRunning: true,
            secuence: hits,
            points: currentPoints + 1
        })
        for(var i = 0;i < hits.length; i++){
            let k = i;
            setTimeout(function(){
                if (k === hits.length-1) {
                    setExtremeState({
                        ...extremeState,
                        gameState: 'started',
                        isRunning: false
                    })
                }
                //updateButtonPressed(hits[k])
            }, 800 * (k + 1));
        }

    }

    const startGame = () => {
        setExtremeState({
            ...extremeState,
            gameState: 'started'
        });
        const rand = Math.floor(Math.random() * 6) + 1;
        const blName = 'bl'+ rand.toString();
        console.log(blName)
        cpuPlay([])

        console.log(extremeState)
    }

    const resetGame = () => {

    }

    const gameOver = () => {

    }

    const setHit = () => {

    }

    const returnToIndex = () => {
        resetGame();
        dispatch({type: 'INTRO'})
        sounds.fadeSound(false, sounds.bgGameSound);
    }
 
    const handleKeyDown = ({ keyName }) => {
        
        const bl1Div = refContainer.current.querySelector('.bl1');
        const bl2Div = refContainer.current.querySelector('.bl2');
        const bl3Div = refContainer.current.querySelector('.bl3');
        const bl4Div = refContainer.current.querySelector('.bl4');
        const bl5Div = refContainer.current.querySelector('.bl5');
        const bl6Div = refContainer.current.querySelector('.bl6');

        if (keyName === 'KeyQ') {
            bl1Div.classList.add('hit');
            releasePress(bl1Div)
            soundsM.playSound(true, soundsM.b1Sound);
        }
        if (keyName === 'KeyW') {
            bl2Div.classList.add('hit');
            releasePress(bl2Div)
            soundsM.playSound(true, soundsM.b2Sound);
        }
        if (keyName === 'KeyE') {
            bl3Div.classList.add('hit');
            releasePress(bl3Div)
            soundsM.playSound(true, soundsM.b3Sound);
        }
        if (keyName === 'KeyA') {
            bl4Div.classList.add('hit');
            releasePress(bl4Div)
            soundsM.playSound(true, soundsM.b4Sound);
        } 
        if (keyName === 'KeyS') {
            bl5Div.classList.add('hit');
            releasePress(bl5Div)
            soundsM.playSound(true, soundsM.b5Sound);
        } 
        if (keyName === 'KeyD') {
            bl6Div.classList.add('hit');
            releasePress(bl6Div)
            soundsM.playSound(true, soundsM.b6Sound);
        }
    };

    const releasePress = (key) => {
        setTimeout(() => {
            key.classList.remove('hit');
        }, 100)
    }

    useKeyDown(handleKeyDown);

    return (
      <div className="container container-intro container-game container-extreme">
        <p className="ext-record">Current Record: <span>{extremeState.record}</span></p>
        <p className="ext-points">Points: <span>{extremeState.points}</span></p>
        <div ref={refContainer} className='matrix'>
            <div className="bl bl1"  onTouchStartCapture={handleTouch} onClick={handlePress}></div>
            <div className="bl bl2"  onTouchStartCapture={handleTouch} onClick={handlePress}></div>
            <div className="bl bl3"  onTouchStartCapture={handleTouch} onClick={handlePress}></div>
            <div className="bl bl4"  onTouchStartCapture={handleTouch} onClick={handlePress}></div>
            <div className="bl bl5"  onTouchStartCapture={handleTouch} onClick={handlePress}></div>
            <div className="bl bl6"  onTouchStartCapture={handleTouch} onClick={handlePress}></div>
        </div>
        <div className={buttonsHidden + ' action-buttons'}>
            <button id="return" onClick={startGame} className="btn btn-vspace start no-space-sides-mobile">Start</button> 
            <button id="return" onClick={returnToIndex} className="btn btn-vspace return no-space-sides-mobile">Return</button> 
        </div>
      </div>
    )
}

export default Extreme;