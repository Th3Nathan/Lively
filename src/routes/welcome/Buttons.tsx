import * as React from 'react';
import './Buttons.css';
export const Submit = (fa: any, text: any) => (
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

export const NewTeamButton = ({enabled, msg}: any) => {
    let className = enabled ? 'newteam' : 'newteamdisabled';
    return (
        <button className={`Button ${ className }`}>
                {msg} <span> 
                <i className="fa fa-arrow-right"/>
                </span>
        </button>
    )
};