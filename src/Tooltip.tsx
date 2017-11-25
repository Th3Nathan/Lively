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
        // Not doing this shit anymore, this if else needs
        // to be refactored into functional comp once stuff starts working
        return (
            <Hoverable 
                render={(state: HoverState) => {
                    let hovering = state.hovering;
                    let tooltip;
                    if (hovering) {
                        tooltip = <div>I AM A TOOLTIP{this.props.data.primary}</div>;
                    } else {
                        tooltip = <div>there is no toolbip showing now yo{this.props.data.secondary}</div>;
                    }
                    return (
                        <div className="Tooltip">
                            {this.props.children}
                            {tooltip}  
                        </div>
                    );
                }}
            />
        );
    }
}

export default Tooltip;