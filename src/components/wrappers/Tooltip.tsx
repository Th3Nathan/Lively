import * as React from 'react';
import './Tooltip.css';
import Hoverable from './Hoverable';

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

    construct = () => {
        let {primary, secondary, orientation} = this.props.data;
        if (secondary) {
            secondary = ' ' + secondary; 
        }
        return (
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
        );
    }

    render() {
        return (
            <Hoverable>
                {({hovering}: {hovering: Boolean}) => {
                    return (
                        <div>
                            {this.props.children}
                            {hovering ? this.construct() : null}  
                        </div>
                    );
                }}
            </ Hoverable>
        );
    }
}

export default Tooltip;