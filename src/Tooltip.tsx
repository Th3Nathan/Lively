import * as React from 'react';
import './Tooltip.css';
import Hoverable from './Hoverable';
import { HoverState } from './interfaces';

// orientatins cover all directions except for west and east
// eg n s ne nw sw se 
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
        // padd secondary with a space if it exists
        if (secondary) {
            secondary = ' ' + secondary; 
        }
        return (
            <Hoverable>
                {({hovering}: HoverState) => {
                    let tooltip = hovering ? (
                        <div className={`Tooltip ${orientation} delay`}>
                            <i 
                                className={`fa fa-caret-up Tooltip-caret Tooltip-caret-${orientation}`}
                                aria-hidden="true"
                            />
                            <div className={`Tooltip-box Tooltip-box-${orientation}`}>
                                <div className={`Tooltip-primary`}>
                                    {primary}
                                    <span className="Tooltip-secondary">
                                        {secondary}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : null;
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