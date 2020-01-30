import React from 'react'

const Intro = ({selectGame, updateActiveFrame, sounds}) => {

    const chooseGame = (e) => {
        selectGame(e.target.id)
        if (e.target.id === 'classic') {
            updateActiveFrame('game-frame');
        } else {
            updateActiveFrame('extreme-frame');
        }
        sounds.playSound(false, sounds.bgIntroSound)
    }

    return (
        <div className="parallax-bg">
            <div className="parallax-bg-1"></div>
            <div className="parallax-bg-2"></div>
            <div className="parallax-bg-3"></div>
            <div className="parallax-bg-4"></div>
            <div className="parallax-bg-5"></div>
            <div className="parallax-bg-6"></div>
            <div className="parallax-bg-7"></div>
            <div className="parallax-bg-8"></div>
            <div className="parallax-bg-9"></div>
            <div className="container container-intro">
            
                <div className="intro">
                    <div>
                        <h1 className="title animated pulse">Simon Say's Overload</h1>   
                    </div>
                    <div className="instructions">
                        <p>To play with keyboard use keys: Y, G, B, R</p>
                    </div>
                    <div className="intro-buttons">
                        <button id="classic" onClick={chooseGame} className="btn btn-vspace">Overload</button>    
                        <button id="extreme" onClick={chooseGame} className="btn btn-vspace">Extreme</button> 
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default Intro;