
import * as React from 'react';
import SidebarHeader from './SidebarHeader';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="Sidebar">
                <SidebarHeader status="poopy" active="snooze"/>
            </div>
        );
    }
}

export default Sidebar;