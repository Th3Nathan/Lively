
import * as React from 'react';
import './DotIcon.css';
import Tooltip from '../wrappers/Tooltip';

interface DotIconProps {
    status: String;
}

class DotIcon extends React.Component<DotIconProps, {}> {
    constructor(props: DotIconProps) {
        super(props);
    }

    statusTooltipData = (status: String) => {
        if (status === 'active') {
            return {
                primary: 'Active',
                orientation: 'se'
            };
        } else if (status === 'snooze') {
            return {
                primary: 'Away',
                secondary: 'Notifications Snoozed',
                orientation: 'se'
            };
        } else {
            return {
                primary: 'Away',
                orientation: 'se'
            };
        }
    }

    iconFromStatus = (status: String) => {
        if (status === 'active') {
            return <i style={{'color': '#38978D'}} className="fa fa-circle" aria-hidden="true" />;
        } else if (status === 'snooze') {
            return <i style={{'color': '#ab9ba9'}} className="fa fa-hand-o-left" aria-hidden="true" />;
        } else {
            return <i style={{'color': '#ab9ba9'}} className="fa fa-circle-o" aria-hidden="true" />;
        }

    }
    render() {
        return (
            <Tooltip data={this.statusTooltipData(this.props.status)}>
                <div className="DotIcon">
                    {this.iconFromStatus(this.props.status)}
                </div>
            </Tooltip>
        );
    }
}

export default DotIcon;