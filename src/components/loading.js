import React, {useState, useEffect} from 'react'

const Loading = ({updateActiveFrame, store, dispatch}) => {

    const [show, setShow] = useState('loading-active');

    useEffect(() => {
        setTimeout(() => {
            setShow('');
            dispatch({type: 'INTRO'})
        }, 3000)
    },[])
    
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