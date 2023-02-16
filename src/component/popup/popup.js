import React from 'react';
import './popup.css';
import Closepopup from '../../images/closePopup.svg'

function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                {props.children}
                <img className='close-btn' src={Closepopup} onClick={() => props.setTrigger(false)} alt="closeimage"></img>
            </div>
        </div>
    ) : "";
}

export default Popup;