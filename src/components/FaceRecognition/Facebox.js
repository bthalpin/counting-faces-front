import React from 'react';
import './FaceRecognition.css';

const Facebox = ({singleFace}) => {
    return (
        <div className = "boundingbox" style = {{top:singleFace.topRow, right:singleFace.rightCol, bottom:singleFace.bottomRow, left:singleFace.leftCol}}>
        
        </div>
           
    )
}

export default Facebox;