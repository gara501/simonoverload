import React, {useState, useEffect, useRef} from 'react';
import keyPress from '../hooks/keyboard';

const Basic = ({ side, clickAction, sounds, autoPressed, releaseSide }) => {

    const [isPressed, setIsPressed] = useState('');
    const keyTopLeft = keyPress('r');
    const keyTopRight = keyPress('t');
    const keyBottomLeft = keyPress('d');
    const keyBottomRight = keyPress('f');
    const refContainer = useRef();

    useEffect(() => {
        if (side === autoPressed) {
            setIsPressed('pressed')
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
        console.log('ISPRESSED', this);
    }, [autoPressed, releaseSide, isPressed, side])

    const handlePress = (e) => {
        let button = e.target;
        button.classList.add('pressed')
        let selected = 0;
        if (e.target.className.includes('topleft')) {
            selected = 1;
            sounds.playSound(true, sounds.topLeftSound)
        }
        if (e.target.className.includes('topright')) {
            selected = 2;
            sounds.playSound(true, sounds.topRightSound)
        }
        if (e.target.className.includes('bottomleft')) {
            selected = 3;
            sounds.playSound(true, sounds.bottomLeftSound)
        }
        if (e.target.className.includes('bottomright')) {
            selected = 4;
            sounds.playSound(true, sounds.bottomRightSound)
        }
        
        setTimeout(() => {
            button.classList.remove('pressed')
        }, 100)

        clickAction(selected);
    }

    const handleKeyboard = (reference) => {
        let selected = 0;
        if (reference.className.includes('topleft')){
            reference.classList.add('pressed')
            selected = 1;
            sounds.playSound(true, sounds.topLeftSound)
        }
        setTimeout(() => {
            reference.classList.remove('pressed')
        }, 100)

        clickAction(selected);
    }

    if (keyTopLeft) {
        //clickButton(1);
        //setSectionPressed('topLeft');
        console.log(refContainer.current)
        handleKeyboard(refContainer.current)

        
    }

    const handleTouch = (e) => {
        e.target.classList.add('pressed')
    }

    return (
        <div ref={refContainer} className={side + ' block ' + isPressed} onTouchStartCapture={handleTouch} onClick={handlePress} >
            
        </div>
    )
}

export default Basic;