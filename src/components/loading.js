import React, {useState, useEffect} from 'react'

const Loading = ({status}) => {

    const [show, setShow] = useState('loading-active');

    useEffect(() => {
        setTimeout(() => {
            setShow('');
        }, 3000)
    })
    
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