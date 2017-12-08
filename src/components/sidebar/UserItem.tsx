import * as React from 'react';
import DotIcon from './DotIcon';
import './UserItem.css';

interface Props {
    status: string;
    highlighted: boolean;
    username: string;
    children?: {};
}

class UserItem extends React.Component<Props, {}> {
    style = {'color': this.props.highlighted ? 'white' : '#ab9ba9'};
    render() {
        return (
            <div className="UserItem flex">
                <DotIcon status={this.props.status} /> 
                <div style={this.style} className="UserItem-name">
                    th3nathan
                </div>
            </div>
        );
    }
}

export default UserItem;