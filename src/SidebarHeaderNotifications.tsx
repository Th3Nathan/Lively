import * as React from 'react';
import './SidebarHeaderNotifications.css';

export interface SidebarHeaderNotificationsProps {
    status: String;
}

class SidebarHeaderNotifications extends React.Component<SidebarHeaderNotificationsProps, {}> {
    constructor(props: SidebarHeaderNotificationsProps) {
        super(props);
    }
    render() {
        let fontAwesome = this.props.status === 'snoozing' ? 'clock-o' : 'bell-o';
        return (
            <i 
                className={`fa fa-${fontAwesome} SidebarHeaderNotifications-bell`}
                aria-hidden="true"
            />
        );
    }
}

export default SidebarHeaderNotifications;