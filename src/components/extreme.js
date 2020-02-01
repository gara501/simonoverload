import React, {useState, useEffect, useRef} from 'react'
import SoundsManager from './soundsManager';
import { useKeyDown, useKeyCombo } from "react-keyboard-input-hook";



let playerHitCounter = 1;
let secuence = [];
const soundsM = new SoundsManager();


const Extreme = ({ side, dispatch, sounds, releaseSide }) => {
    const initialExtremeState = {
        isRunning: false,
        gameState: 'loaded',
        record: (localStorage.getItem('simonsaysExtreme') ? JSON.parse(localStorage.getItem('simonsaysExtreme')).record: 0)
    }
    const [extremeState, setExtremeState] = useState(initialExtremeState)
    const [buttonsHidden, setButtonsHidden] = useState('');
    const [currentPoints, setCurrentPoints] = useState(0);
    const [gameOverCss, setGameOverCss] = useState('')
    const [level, setLevel] = useState('level1');
    
    const buttons = {
        B1: 'bl1',
        B2: 'bl2',
        B3: 'bl3',
        B4: 'bl4',
        B5: 'bl5',
        B6: 'bl6'
    }
    const refContainer = useRef();
    

    const handleClickAndTouch = (button) => {
        let keyResponse = '';
        if (button.classList.contains(buttons.B1)) {
            keyResponse = setButtonPressed('bl1');
        }
        if (button.classList.contains(buttons.B2)) {
            keyResponse = setButtonPressed('bl2');
        }
        if (button.classList.contains(buttons.B3)) {
            keyResponse = setButtonPressed('bl3');
        }
        if (button.classList.contains(buttons.B4)) {
            keyResponse = setButtonPressed('bl4');
        }
        if (button.classList.contains(buttons.B5)) {
            keyResponse = setButtonPressed('bl5');
        }
        if (button.classList.contains(buttons.B6)) {
            keyResponse = setButtonPressed('bl6');
        }
        return keyResponse;
    }

    const releasePress = (key) => {
        setTimeout(() => {
            key.classList.remove('hit');
        }, 100)
    }

    const setButtonPressed = (button) => {
        const bl1Div = refContainer.current.querySelector('.bl1');
        const bl2Div = refContainer.current.querySelector('.bl2');
        const bl3Div = refContainer.current.querySelector('.bl3');
        const bl4Div = refContainer.current.querySelector('.bl4');
        const bl5Div = refContainer.current.querySelector('.bl5');
        const bl6Div = refContainer.current.querySelector('.bl6');
        let selectedKey = '';

        if (button === 'bl1') {
            bl1Div.classList.add('hit');
            releasePress(bl1Div)
            soundsM.playSound(true, soundsM.b1Sound);
            selectedKey = 'bl1';
        }
        if (button === 'bl2') {
            bl2Div.classList.add('hit');
            releasePress(bl2Div)
            soundsM.playSound(true, soundsM.b2Sound);
            selectedKey = 'bl2';
        }
        if (button === 'bl3') {
            bl3Div.classList.add('hit');
            releasePress(bl3Div)
            soundsM.playSound(true, soundsM.b3Sound);
            selectedKey = 'bl3';
        }
        if (button === 'bl4') {
            bl4Div.classList.add('hit');
            releasePress(bl4Div)
            soundsM.playSound(true, soundsM.b4Sound);
            selectedKey = 'bl4';
        } 
        if (button === 'bl5') {
            bl5Div.classList.add('hit');
            releasePress(bl5Div)
            soundsM.playSound(true, soundsM.b5Sound);
            selectedKey = 'bl5';
        } 
        if (button === 'bl6') {
            bl6Div.classList.add('hit');
            releasePress(bl6Div)
            soundsM.playSound(true, soundsM.b6Sound);
            selectedKey = 'bl6';
        }
        return selectedKey;
    }

    const playerPlay = (key) => {
        if (!extremeState.isRunning && extremeState.gameState === 'started') {
            if (key === secuence[playerHitCounter-1]) {
                if (playerHitCounter === secuence.length) {
                    playerHitCounter = 1;
                    setCurrentPoints(currentPoints+1);
                    cpuPlay(secuence);
                } else {
                    playerHitCounter +=1;
                }
                
            } else {
                console.log('GAME OVER');
                gameOver();
            }
            
        }
    }

    const handlePress = (e) => {
        let button = e.target;
        const lastOption = handleClickAndTouch(button);
        playerPlay(lastOption);
    }

    const handleTouch = (e) => {
        if (e.type === 'touchstart') {
            const button = e.target;
            const lastOption = handleClickAndTouch(button);
            playerPlay(lastOption);
        }        
    }

    const cpuPlay= (internalSecuence) => {
        const hits = internalSecuence;
        const rand = Math.floor(Math.random() * 6) + 1;
        const blName = 'bl' + rand.toString();
        let speed = 800;
        hits.push(blName);
        setExtremeState({
            ...extremeState,
            isRunning: true
        })

        // Increase Difficulty
        if (currentPoints >=5) {
            speed = 400;
            setLevel('level2');
        } else if (currentPoints >= 7) {
            speed = 300;
        } else if (currentPoints >= 10) {
            speed = 200;
            setLevel('level3')
        } else if (currentPoints >= 15) {
            speed = 100;
            setLevel('level4')
        }

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
                setButtonPressed(hits[k])
            }, speed * (k + 1));
        }
        secuence = hits;
    }

    const startGame = () => {
        resetGame();
        setExtremeState({
            ...extremeState,
            gameState: 'started'
        });
        cpuPlay([])
        setButtonsHidden('buttons-hidden');
    }

    const resetGame = () => {
        secuence = [];
        playerHitCounter = 1;
        setCurrentPoints(0);
        setGameOverCss('');
    }

    const gameOver = () => {
        setGameOverCss('animated heartBeat infinite');
        soundsM.fadeSound(false, sounds.bgGameSound)
        soundsM.playSound(true, sounds.gameOverSound)
        if (currentPoints > extremeState.record) {
            localStorage.setItem('simonsaysExtreme', JSON.stringify({record: currentPoints }));
        }
        setButtonsHidden('');
    }

    const returnToIndex = () => {
        resetGame();
        dispatch({type: 'INTRO'})
        sounds.fadeSound(false, sounds.bgGameSound);
    }
 
    const handleKeyDown = ({ keyName }) => {
        if (keyName === 'KeyQ') {
            setButtonPressed('bl1');
            playerPlay('bl1');
        }
        if (keyName === 'KeyW') {
            setButtonPressed('bl2');
            playerPlay('bl2');
        }
        if (keyName === 'KeyE') {
            setButtonPressed('bl3');
            playerPlay('bl3');
        }
        if (keyName === 'KeyA') {
            setButtonPressed('bl4');
            playerPlay('bl4');
        } 
        if (keyName === 'KeyS') {
            setButtonPressed('bl5');
            playerPlay('bl5');
        } 
        if (keyName === 'KeyD') {
            setButtonPressed('bl6');
            playerPlay('bl6');
        }
    };

    useKeyDown(handleKeyDown);

    return (
      <div className="container container-intro container-game container-extreme">
        <p className="ext-record">Current Record: <span>{extremeState.record}</span></p>
        <p className="ext-points">Points: <span>{currentPoints}</span></p>
        <div ref={refContainer} className={level + ' matrix'}>
            <div className="bl bl1"  onTouchStartCapture={handleTouch}  onTouchEnd={e => e.preventDefault()} onClick={handlePress}></div>
            <div className="bl bl2"  onTouchStartCapture={handleTouch}  onTouchEnd={e => e.preventDefault()} onClick={handlePress}></div>
            <div className="bl bl3"  onTouchStartCapture={handleTouch}  onTouchEnd={e => e.preventDefault()} onClick={handlePress}></div>
            <div className="bl bl4"  onTouchStartCapture={handleTouch}  onTouchEnd={e => e.preventDefault()} onClick={handlePress}></div>
            <div className="bl bl5"  onTouchStartCapture={handleTouch}  onTouchEnd={e => e.preventDefault()} onClick={handlePress}></div>
            <div className="bl bl6"  onTouchStartCapture={handleTouch}  onTouchEnd={e => e.preventDefault()} onClick={handlePress}></div>
        </div>
        <div className={buttonsHidden + ' action-buttons'}>
            <button id="return" onClick={startGame} className="btn btn-vspace start no-space-sides-mobile">Start</button> 
            <button id="return" onClick={returnToIndex} className="btn btn-vspace return no-space-sides-mobile">Return</button> 
        </div>
        <div className={gameOverCss + ' gameover'}>
            <h1>Game Over</h1>
        </div>
      </div>
    )
}

export default Extreme;