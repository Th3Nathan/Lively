import * as React from 'react';
import './UserItem.css';
import DotIcon from './DotIcon';

interface Props {
    status: String;
    highlighted: Boolean;
    username: String;
    children?: {};
}

class UserItem extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let style = this.props.highlighted ? {'color': 'white'} : {'color': '#ab9ba9'};
        return (
            <div className="UserItem flex">
                <DotIcon status={this.props.status} /> 
                <div style={style} className="UserItem-name">
                    th3nathan
                </div>
            </div>
        );
    }
}

export default UserItem;