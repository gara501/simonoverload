import React, {useState} from 'react'

const Sound = ({gameState, sounds}) => {
    
    const [icon, setIcon] = useState('volume_up');

    const handleClick = (e) => {
        if (icon === 'volume_up') {
            setIcon('volume_off')
            if (gameState.active === 'intro-frame') {
                sounds.fadeSound(false, sounds.bgIntroSound)
            } else if(gameState.active === 'game-frame') {
                sounds.fadeSound(false, sounds.bgGameSound)
            } else if(gameState.active === 'extreme-frame') {
                sounds.fadeSound(false, sounds.bgGameSound)
            }
        } else {
            setIcon('volume_up')
            if (gameState.active === 'intro-frame') {
                sounds.fadeSound(true, sounds.bgIntroSound)
            } else if(gameState.active === 'game-frame') {
                sounds.fadeSound(true, sounds.bgGameSound)
            } else if(gameState.active === 'extreme-frame') {
                sounds.fadeSound(true, sounds.bgGameSound)
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