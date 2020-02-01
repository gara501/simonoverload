import React, {useState, useEffect} from 'react'
import useInterval from '../hooks/useInterval'


const Loading = ({dispatch, soundsM}) => {

    const [show, setShow] = useState('loading-active');
    let soundsFilesLoaded = 0;

    useInterval(() => {
       console.log(soundsM.bgIntroSound._state)
      if (soundsM.bgIntroSound._state === 'loaded') {
           soundsFilesLoaded +=1;
      }
      if (soundsM.bgGameSound._state === 'loaded') {
        soundsFilesLoaded +=1;
      }
      if (soundsFilesLoaded >= 2) {
        setShow('');
        dispatch({type: 'INTRO'})
      }
    }, 1000)
/*
    useEffect(() => {
        setTimeout(() => {
            setShow('');
            dispatch({type: 'INTRO'})
        }, 10000)
    },[])
*/  
    return (
        <div className={show + ' container loading-container'}>
            <div className="loading">
                <div>
                    <h1 className="title animated pulse">Loading...</h1>
                </div>
            </div>

        </div>
        
    )
}

export default Loading;