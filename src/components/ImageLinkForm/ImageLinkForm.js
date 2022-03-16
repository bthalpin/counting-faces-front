import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmit,input}) => {
    return (
        <div>
            <p className = 'f3 white'>
                {'This Magic Brain will detect faces in your pictures.  Give it a try.'}
            </p>
            <div className = 'center'>
                <div className = 'form center pa4 br3 shadow-5'>
                    <input className = 'f4 pa2 w-70 center' value={input} type = 'text' onChange = {onInputChange}/>
                    <button 
                        className = 'flex center w-30 grow f4 link ph3 pv2 dib white bg-gray' 
                        onClick = {onSubmit}>Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;