import React from 'react';
import './secondaryButton.css';

const SecondaryButton = (props) => {
    return (
        <button onClick={props.handler} className="btn info">
                {props.name}
        </button>

    );
};

export default SecondaryButton;