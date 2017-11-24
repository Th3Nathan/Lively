
import * as React from 'react';
import './DotIcon.css';
import { DotIconProps } from './interfaces';
import Tooltip from './Tooltip';

// interface statusTooltipData {
//     primary: String;
//     secondary?: String;
//     orientation: String;
// }

class DotIcon extends React.Component<DotIconProps, {}> {
    constructor(props:DotIconProps) {
        super(props);
    }


    statusTooltipData = (status:String) => {
        if (status === "active") {
            return {
                primary: "Active",
                orientation: "below"
            }
        }
        else if (status === "snooze") {
            return {
                primary: "Away",
                secondary: "Notifications Snoozed",
                orientation: "above"
            }
        }
        else {
            return {
                primary: "Away",
                orientation: "above"
            }
        }
    }

    iconFromStatus = (status:String) => {
        if (status === "active") {
            return <i style={{'color': '#38978D'}} className="fa fa-circle" aria-hidden="true"></i>
        } else if (status === "snooze") {
            return <i style={{'color': '#ab9ba9'}} className="fa fa-hand-o-left" aria-hidden="true"></i>
        } else {
            return <i style={{'color': '#ab9ba9'}} className="fa fa-circle-o" aria-hidden="true"></i>
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