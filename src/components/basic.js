import React, {useState, useEffect, useRef} from 'react';
import keyPress from '../hooks/keyboard';
import { useKeyDown } from "react-keyboard-input-hook";

const Basic = ({ side, clickAction, sounds, autoPressed, releaseSide }) => {

    const [isPressed, setIsPressed] = useState('');
    const refContainer = useRef();

    const sides = {
        TOPLEFT: 'topleft',
        TOPRIGHT: 'topright',
        BOTTOMLEFT: 'bottomleft',
        BOTTOMRIGHT: 'bottomright'
    };

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
    }, [autoPressed, releaseSide, isPressed, side])

    const handlePress = (e) => {
        let button = e.target;
        button.classList.add('pressed');
        handlePressed(e.target.className)
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 100)

        //clickAction(selected);
    }

    const handlePressed = (option) => {
        let selected = 0;
        
        if (option.includes(sides.TOPLEFT)) {
            selected = 1;
            sounds.playSound(true, sounds.topLeftSound)
        }
        if (option.includes(sides.TOPRIGHT)) {
            selected = 2;
            sounds.playSound(true, sounds.topRightSound)
        }
        if (option.includes(sides.BOTTOMLEFT)) {
            selected = 3;
            sounds.playSound(true, sounds.bottomLeftSound)
        }
        if (option.includes(sides.BOTTOMRIGHT)) {
            selected = 4;
            sounds.playSound(true, sounds.bottomRightSound)
        }
        clickAction(selected);
    }

    const handleKeyboard = (key, container) => {
        if (key === sides.TOPLEFT) {
            if (container.classList.contains(sides.TOPLEFT)){
                container.classList.add('pressed');
                handlePressed(sides.TOPLEFT)
            }
        }
        if (key === sides.TOPRIGHT) {
            if (container.classList.contains(sides.TOPRIGHT)){
                container.classList.add('pressed');
                handlePressed(sides.TOPRIGHT)
            }
        }
        if (key === sides.BOTTOMLEFT) {
            if (container.classList.contains(sides.BOTTOMLEFT)){
                container.classList.add('pressed');
                handlePressed(sides.BOTTOMLEFT)
            }
        }
        if (key === sides.BOTTOMRIGHT) {
            if (container.classList.contains(sides.BOTTOMRIGHT)){
                container.classList.add('pressed');
                handlePressed(sides.BOTTOMRIGHT)
            }
        }
        setTimeout(() => {
            container.classList.remove('pressed');
        }, 100)
    }

    const handleKeyDown = ({ keyName }) => {
        if (keyName === 'KeyG') {
            handleKeyboard(sides.TOPLEFT, refContainer.current);
        }
        if (keyName === 'KeyR') {
            handleKeyboard(sides.TOPRIGHT, refContainer.current);
        }
        if (keyName === 'KeyY') {
            handleKeyboard(sides.BOTTOMLEFT, refContainer.current);
        }
        if (keyName === 'KeyB') {
            handleKeyboard(sides.BOTTOMRIGHT, refContainer.current);
        } 
    };
    useKeyDown(handleKeyDown);

    const handleTouch = (e) => {
        e.target.classList.add('pressed')
    }

    return (
        <div ref={refContainer} className={side + ' block ' + isPressed} onTouchStartCapture={handleTouch} onClick={handlePress} >
            
        </div>
    )
}

export default Basic;