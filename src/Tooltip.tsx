import * as React from 'react';
import './Tooltip.css';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';

interface Props {
    data: {
        primary: String;
        secondary?: String;
        orientation: String;
    };
}

class Tooltip extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let {primary, secondary, orientation} = this.props.data;
        //padd secondary with a space if it exists
        if (secondary) {
            secondary = " " + secondary; 
        }
        return (
            <Hoverable>
                {({hovering}: HoverState) => {
                    let style = hovering ? {'visibility': 'visible'} : {'visibility': 'hidden'};
                    let tooltip = hovering ? (
                        <div style={style} className="Tooltip delay">
                            <i className="fa fa-caret-up Tooltip-caret" aria-hidden="true"></i>
                            <div className="Tooltip-box">
                                <div className={`Tooltip-primary-${orientation}`}>
                                    {primary}
                                    <span className="Tooltip-secondary">
                                        {secondary}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : null
                    return (
                        <div className="">
                            {this.props.children}
                            {tooltip}  
                        </div>
                    );
                }}
            </ Hoverable>
        );
    }
}

export default Tooltip;