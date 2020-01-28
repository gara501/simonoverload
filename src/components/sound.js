import React, {useState} from 'react'

const Sound = ({gameState, sounds}) => {
    
    const [icon, setIcon] = useState('volume_up');

    const handleClick = (e) => {
        if (icon === 'volume_up') {
            setIcon('volume_off')
            if (gameState.active === 'intro-frame') {
                sounds.introSound(false);
            } else if(gameState.active === 'game-frame') {
                sounds.gameSound(false);
            }
        } else {
            setIcon('volume_up')
            if (gameState.active === 'intro-frame') {
                sounds.introSound(true);
            } else if(gameState.active === 'game-frame') {
                sounds.gameSound(true);
            }
        }
    }

    return (
        <i className="volumeicon material-icons" onClick={handleClick}>
            {icon}
        </i>
        
    )
}

export default Sound;