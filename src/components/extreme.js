import React, {useState, useEffect} from 'react'

const Extreme = ({ side, clickAction, sounds, autoPressed, releaseSide }) => {

    const [isPressed, setIsPressed] = useState('');
    
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
        
        setTimeout(() => {
            button.classList.remove('hit')
        }, 100)

        // clickAction(selected);
    }

    const handleTouch = (e) => {
        e.target.classList.add('hit')
    }

    return (
      <div className="container container-intro container-game">
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
      </div>
    )
}

export default Extreme;