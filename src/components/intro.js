import React, {useEffect} from 'react'

const Intro = ({selectGame, sounds, store, dispatch}) => {

    useEffect(() => {
        dispatch({type: 'INTRO'})
    }, [])

    const chooseGame = (e) => {
        //selectGame(e.target.id)
        if (e.target.id === 'classic') {
            //updateActiveFrame('game-frame');
            dispatch({type: 'OVERLOAD'})
        } else {
            dispatch({type: 'EXTREME'})
            //updateActiveFrame('extreme-frame');
        }
        sounds.playSound(false, sounds.bgIntroSound)
    }

    return (
        <div className="container container-intro">
            <div className="intro">
                <div>
                    <h1 className="title animated pulse">Simon Say's Overload</h1>   
                </div>
                <div className="instructions">
                    <p>To play with keyboard use keys: Y, G, B, R</p>
                    <p>Extreme mode: Q,W,E,A,S,D</p>
                </div>
                <div className="intro-buttons">
                    <button id="classic" onClick={chooseGame} className="btn btn-vspace">Overload</button>    
                    <button id="extreme" onClick={chooseGame} className="btn">Extreme</button> 
                </div>
                
            </div>
        </div>   
    )
}

export default Intro;