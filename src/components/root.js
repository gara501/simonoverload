import React, { useState, useEffect } from 'react'
import Basic from './basic'


const Root = ({gameState, updateRecord, sounds, updateActiveFrame}) => {
    
    const status = {
        STARTED: 'started',
        FINISHED: 'finished',
        USERPLAYING: 'userplaying'
    }

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

    const [playTime, setPlayTime] = useState(0);
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

    useEffect(() => {
        if (gameStatus.currentStatus === status.FINISHED) {
            resetGame();
        }

        const rand = Math.floor(Math.random() * 4) + 1;
        setRotation(rotations[rand])        
        
    }, [gameStatus])


    const returnToIndex = () => {
        resetGame();
        updateActiveFrame('intro-frame');
        sounds.gameSound(false);
    }

    const resetGame = () => {
        // Save in local storage only if the value is greater than before
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
        setGameOverCss('');
      
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
                sounds.topLeftSound(true);
                break;
            case 2:
                sounds.topRightSound(true);
                break;
            case 3:
                sounds.bottomLeftSound(true);
                break;
            default:
                sounds.bottomRightSound(true);
                break;
        }
    }

    const updateSecuence = (secuence) => {
        let sides = secuence;
        const rand = Math.floor(Math.random() * 4) + 1;
        sides.push(rand)
        setCurrentSecuence(sides);
        setCurrentCounter(currentCounter+1);
        
        for(var i = 0;i < sides.length; i++){
            let k = i;
            setTimeout(function(){
                if (k === sides.length-1) {
                    setGameStatus({
                        ...gameStatus,
                        currentStatus: status.STARTED,
                        isRunning: false
                    })
                    initCounter();
                }
                updateButtonPressed(sides[k])
            }, 800 * (k + 1));
        }
    }

    const initCounter = () => {
        let counter = 0;
        setInterval(() => {
            counter++;
            setPlayTime(counter);
        }, 1000)
    }

    const gameOver = () => {
        resetGame();
        setGameOverCss('animated heartBeat infinite');
        sounds.gameSound(false);
        sounds.gameOverSound(true);
        setButtonsHidden('');
        setReleaseSide(true);
    }

    return (
        <div className="container container-intro container-game">
            <div className="game">
                <h2 className="playt">{playTime}</h2>
                <div className="circle">                 
                    <p className="points score"><span>{currentCounter}</span></p>
                    <div className="innercircle"></div>
                    <div className={rotation + ' figure'}>
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
                    <button id="return" onClick={returnToIndex} className="btn btn-vspace return">Return</button> 
                </div>
                <div className={gameOverCss + ' gameover'}>
                    <h1>Game Over</h1>
                </div>
            </div>

        </div>
        
    )
}

export default Root;