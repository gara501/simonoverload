import React, {useState, useEffect} from 'react'
import SoundsManager from './soundsManager';

const Extreme = ({ side, clickAction, sounds, autoPressed, releaseSide }) => {

    const [isPressed, setIsPressed] = useState('');
    const [buttonsHidden, setButtonsHidden] = useState('');
    const [currentPoints, setCurrentPoints] = useState(0);
    const soundsM = new SoundsManager();

    useEffect(() => {
        if (side === autoPressed) {
            setIsPressed('hit')
            setTimeout(() => {
                setIsPressed('')
            }, 500)
        }

        if (releaseSide) {
            setIsPressed('');
            setTimeout(() => {
                setIsPressed('')
            }, 2000)
        }
        console.log('ISPRESSED', isPressed);
    }, [autoPressed, releaseSide])


    const handlePress = (e) => {
        let button = e.target;
        button.classList.add('hit')
        
        soundsM.playSound(true, soundsM.b1Sound);
        setTimeout(() => {
            button.classList.remove('hit')
        }, 100)

        // clickAction(selected);
    }

    const handleTouch = (e) => {
        e.target.classList.add('hit')
    }

    const startGame = () => {

    }

    const returnToIndex = () => {
      
    }

    return (
      <div className="container container-intro container-game container-extreme">
        <p className="ext-points">Points: <span>{currentPoints}</span></p>
        <div className='matrix'>
            <div className="bl bl1" onClick={handlePress}>1</div>
            <div className="bl bl2" onClick={handlePress}>2</div>
            <div className="bl bl3" onClick={handlePress}>3</div>
            <div className="bl bl4" onClick={handlePress}>4</div>
            <div className="bl bl5" onClick={handlePress}>5</div>
            <div className="bl bl6" onClick={handlePress}>6</div>
            <div className="bl bl7" onClick={handlePress}>7</div>
            <div className="bl bl8" onClick={handlePress}>8</div>
            <div className="bl bl9" onClick={handlePress}>9</div>
        </div>
        <div className={buttonsHidden + ' action-buttons'}>
            <button id="return" onClick={startGame} className="btn btn-vspace start no-space-sides-mobile">Start</button> 
            <button id="return" onClick={returnToIndex} className="btn btn-vspace return no-space-sides-mobile">Return</button> 
        </div>
      </div>
    )
}

export default Extreme;