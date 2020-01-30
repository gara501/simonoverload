import React, {useState} from 'react'

const Sound = ({dispatch}) => {
    
    const [icon, setIcon] = useState('volume_up');

    const handleClick = (e) => {
        if (icon === 'volume_up') {
            setIcon('volume_off')
            dispatch({type: 'MUTE', muted: true})
/*
            if (store.active === 'intro-frame') {
                sounds.fadeSound(false, sounds.bgIntroSound)
            } else if(store.active === 'game-frame') {
                sounds.fadeSound(false, sounds.bgGameSound)
            } else if(store.active === 'extreme-frame') {
                sounds.fadeSound(false, sounds.bgGameSound)
            }
            */
        } else {
            setIcon('volume_up')
            // sounds.stopAllSounds();
            dispatch({type: 'MUTE', muted: false})
            /*
            if (store.active === 'intro-frame') {
                sounds.fadeSound(true, sounds.bgIntroSound)
            } else if(store.active === 'game-frame') {
                sounds.fadeSound(true, sounds.bgGameSound)
            } else if(store.active === 'extreme-frame') {
                sounds.fadeSound(true, sounds.bgGameSound)
            }
            */
        }
    }

    return (
        <i className="volumeicon material-icons" onClick={handleClick}>
            {icon}
        </i>
        
    )
}

export default Sound;