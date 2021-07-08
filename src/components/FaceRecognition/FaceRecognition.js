import React from 'react';
import Facebox from './Facebox';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
        return (
            <div className = 'center ma'>
                <div className = 'absolute mt2'>
                    <img id = "inputimage" src = {imageUrl} alt ='' width = '500px' height = 'auto'/> 
                   
                    {
                        Object.keys(box).map((face,i)=>{
                            return(
                               
                                <Facebox singleFace= {box[i]} />
                            )
                        })
                    }
                </div>
                          
            </div>
        )
}

export default FaceRecognition;