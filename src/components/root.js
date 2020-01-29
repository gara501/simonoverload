import React, { useState, useEffect } from 'react'
import useInterval from '../hooks/useInterval'
import Basic from './basic'
import keyPress from '../hooks/keyboard'


const Root = ({gameState, updateRecord, sounds, updateActiveFrame}) => {
    
    const status = {
        STARTED: 'started',
        FINISHED: 'finished',
        USERPLAYING: 'userplaying'
    }

    const keyTopLeft = keyPress('r');
    const keyTopRight = keyPress('t');
    const keyBottomLeft = keyPress('d');
    const keyBottomRight = keyPress('f');

    const sections = {
        1: 'topleft',
        2: 'topright',
        3: 'bottomleft',
        4: 'bottomright'
    }

    const [gameStatus, setGameStatus] = useState({
        isRunning: false,
        currentStatus: 'opened'
    })

    const [playTime, setPlayTime] = useState(10);
    const [releaseSide, setReleaseSide] = useState(false);
    const [buttonsHidden, setButtonsHidden] = useState('');
    const [userCounter, setUserCounter] = useState(1)
    const [currentCounter, setCurrentCounter] = useState(0)
    const [currentSecuence, setCurrentSecuence] = useState([])
    const [sectionPressed, setSectionPressed] = useState('');
    const [gameOverCss, setGameOverCss] = useState('')
    const [rotation, setRotation] = useState('');


    const rotations = [
        'rotate90',
        'rotate180',
        'rotate270',
        'rotate360'
    ];

    useInterval(() => {
        if (gameStatus.currentStatus === status.STARTED) {
            if (gameStatus.isRunning === false) {
                setPlayTime(playTime - 1)
            } else {
                setPlayTime(10)    
            }
        } else {
            setPlayTime(10)
        }
        if (playTime === 0) {
            gameOver();
        }
    }, 1000)

    useEffect(() => {
        if (gameStatus.currentStatus === status.FINISHED) {
            resetGame();
        }

        const rand = Math.floor(Math.random() * 4) + 1;
        setRotation(rotations[rand-1])
        
    }, [gameStatus])


    const returnToIndex = () => {
        resetGame();
        updateActiveFrame('intro-frame');
        sounds.fadeSound(false, sounds.bgGameSound);
    }

    const resetGame = () => {
        // Save in local storage only if the value is greater than before
        setGameOverCss('');
        if (currentCounter > gameState.record) {
            localStorage.setItem('simonsays', JSON.stringify({record: currentCounter }));
            updateRecord(currentCounter);
        }
        setCurrentCounter(0);
        setUserCounter(1);
        setCurrentSecuence([])
        setGameStatus({
            isRunning: false,
            currentStatus: 'opened'
        })
    }

    const clickButton = (option) => {
        if (gameStatus.currentStatus === status.STARTED) {    
            if (!gameStatus.isRunning) {
                if (option === currentSecuence[userCounter-1]) {
                    setUserCounter(userCounter+1);
                    if (userCounter === currentSecuence.length) {
                        setUserCounter(1);
                        updateSecuence(currentSecuence);
                    }
                } else {
                    setGameStatus({
                        ...gameStatus,
                        currentStatus: status.FINISHED
                    })
                    gameOver();
                }
            }
        }
    }

    const startGame = () => {
        resetGame();
        setGameStatus({
            ...gameStatus,
            currentStatus: status.STARTED,
            isRunning: true
        })
        updateSecuence(currentSecuence);
        setButtonsHidden('buttons-hidden');
        setReleaseSide(false);
    }

    const updateButtonPressed= (pressed) => {
        setSectionPressed(sections[pressed])
        setTimeout(() => {setSectionPressed('')}, 100)
        playSound(pressed);
    }

    const playSound = (id) => {
        switch (id) {
            case 1:
                sounds.playSound(true, sounds.topLeftSound)
                break;
            case 2:
                sounds.playSound(true, sounds.topRightSound)
                break;
            case 3:
                sounds.playSound(true, sounds.bottomLeftSound)
                break;
            default:
                sounds.playSound(true, sounds.bottomRightSound)
                break;
        }
    }

    const updateSecuence = (secuence) => {
        let sides = secuence;
        const rand = Math.floor(Math.random() * 4) + 1;
        sides.push(rand)
        setCurrentSecuence(sides);
        setCurrentCounter(currentCounter+1);
        setGameStatus({
            ...gameStatus,
            isRunning: true
        })
        
        for(var i = 0;i < sides.length; i++){
            let k = i;
            setTimeout(function(){
                if (k === sides.length-1) {
                    setGameStatus({
                        ...gameStatus,
                        currentStatus: status.STARTED,
                        isRunning: false
                    })
                }
                updateButtonPressed(sides[k])
            }, 800 * (k + 1));
        }
    }

    const gameOver = () => {
        resetGame();
        setGameOverCss('animated heartBeat infinite');
        sounds.fadeSound(false, sounds.bgGameSound)
        sounds.playSound(true, sounds.gameOverSound)
        setButtonsHidden('');
        setReleaseSide(true);
    }

    // Keyboard Support
    if (keyTopLeft) {
        //clickButton(1);
        //setSectionPressed('topLeft');
        console.log('1')
    }
    if (keyTopRight) {
        //clickButton(2);
        //updateButtonPressed(2);
        console.log('2')
    }
    if (keyBottomLeft) {
        //clickButton(3);
        //updateButtonPressed(3);
        console.log('3')
    }
    if (keyBottomRight) {
        //clickButton(4);
        //updateButtonPressed(4);
        console.log('4')
    }

    return (
        <div className="container container-intro container-game">
            <div className="game">
                <p className="playtime">Time left: {playTime}</p>
                <p className="points score"><span>{currentCounter}</span></p>
                <div className={rotation + " circle"}>
                    <div className="innercircle"></div>
                    <div className='figure'>
                        <Basic 
                            side="topleft" 
                            sounds={sounds} 
                            releaseSide={releaseSide} 
                            clickAction={clickButton}
                            autoPressed={sectionPressed} />
                        <Basic side="topright" sounds={sounds} releaseSide={releaseSide} clickAction={clickButton} autoPressed={sectionPressed} />
                        <Basic side="bottomleft" sounds={sounds} releaseSide={releaseSide} clickAction={clickButton} autoPressed={sectionPressed} />
                        <Basic side="bottomright" sounds={sounds} releaseSide={releaseSide} clickAction={clickButton} autoPressed={sectionPressed} />
                    </div>
                </div>
                <div className="indicators">
                    <p><span>Your record: </span><span>{gameState.record}</span></p>
                </div>
                <div className={buttonsHidden + ' action-buttons'}>
                    <button id="return" onClick={startGame} className="btn btn-vspace start">Start</button> 
                    <button id="return" onClick={returnToIndex} className="btn btn-vspace btn-lspace return">Return</button> 
                </div>
                <div className={gameOverCss + ' gameover'}>
                    <h1>Game Over</h1>
                </div>
            </div>

        </div>
        
    )
}

export default Root;