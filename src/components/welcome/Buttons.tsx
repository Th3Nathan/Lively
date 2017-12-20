import * as React from 'react';
import './Buttons.css';

export const Submit = (fa: string, text: string) => (
    <button type="submit" className="Button submit">
        {text} {
            fa ? (
                <span>
                    <i className={`fa fa-${fa}`} aria-hidden="true"/>
                </span>
            ) : null }
    </button>        
);

export const Loading = () => (
    <button className="Button loading">
        Loading <span> 
        <i className="fa fa-spinner fa-spin fa-fw"/>
        <span className="sr-only">Loading...</span>
        </span>
    </button>
);

interface NTBInput {
    enabled: boolean;
    msg: string;
} 

export const SessionButton = ({enabled, msg}: NTBInput) => {
    let className = enabled ? 'session' : 'sessiondisabled';
    return (
        <button type="submit" className={`Button ${ className }`}>
                {msg} <span> 
                <i className="fa fa-arrow-right"/>
                </span>
        </button>
    );
};