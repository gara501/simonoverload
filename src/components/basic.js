import React, {useState, useEffect} from 'react'

const Basic = ({ side, clickAction, sounds, autoPressed, releaseSide }) => {

    const [isPressed, setIsPressed] = useState('');
    
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
        console.log('ISPRESSED', isPressed);
    }, [autoPressed, releaseSide])    

    const handlePress = (e) => {
        let button = e.target;
        button.classList.add('pressed')
        let selected = 0;
        if (e.target.className.includes('topleft')) {
            selected = 1;
            sounds.topLeftSound(true);
        }
        if (e.target.className.includes('topright')) {
            selected = 2;
            sounds.topRightSound(true);
        }
        if (e.target.className.includes('bottomleft')) {
            selected = 3;
            sounds.bottomLeftSound(true);
        }
        if (e.target.className.includes('bottomright')) {
            selected = 4;
            sounds.bottomRightSound(true);
        }
        
        setTimeout(() => {
            button.classList.remove('pressed')
        }, 100)

        clickAction(selected);
    }

    const handleTouch = (e) => {
        e.target.classList.add('pressed')
    }

    return (
        <div className={side + ' block ' + isPressed} onTouchStartCapture={handleTouch} onClick={handlePress} >
            
        </div>
    )
}

export default Basic;