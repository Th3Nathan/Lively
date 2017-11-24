
import * as React from 'react';
import './SidebarHeaderNotifications.css';

class SidebarHeaderNotifications extends React.Component {
    render() {
        return (
            <div className="SidebarHeaderNotifications">
                <i className="fa fa-bell-o" aria-hidden="true"></i>
            </div>
        );
    }
}

export default SidebarHeaderNotifications;