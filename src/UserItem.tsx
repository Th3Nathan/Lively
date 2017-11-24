import * as React from 'react';
import './UserItem.css';
import DotIcon from './DotIcon';

interface Props {
    status: String;
    children?: any;
}

class UserItem extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }


    render() {
        return (
            <div className="UserItem">
                <DotIcon status={this.props.status} /> 
            </div>
        );
    }
}

export default UserItem;