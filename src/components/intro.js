import React from 'react'

const Intro = ({selectGame, updateActiveFrame, sounds}) => {

    const chooseGame = (e) => {
        selectGame(e.target.id)
        updateActiveFrame('game-frame');
        sounds.introSound(false);
    }

    return (
        <div className="container container-intro">
            <div className="intro">
                <div>
                    <h1 className="title animated pulse">Simon Say's Overload</h1>   
                </div>
                <div>
                    <button id="classic" onClick={chooseGame} className="btn btn-vspace">Overload</button>    
                </div>
                <div>
                    <button disabled id="extreme" onClick={chooseGame} className="btn btn-vspace">Extreme</button> 
                </div>
            </div>

        </div>
        
    )
}

export default Intro;