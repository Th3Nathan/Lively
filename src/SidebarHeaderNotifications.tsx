import * as React from 'react';
import './SidebarHeaderNotifications.css';
import NotificationsModal from './NotificationsModal';

import Tooltip from './Tooltip';

export interface SidebarHeaderNotificationsProps {
    status: String;
}

export interface State {
    isModalOpen: boolean;
}

class SidebarHeaderNotifications extends React.Component<SidebarHeaderNotificationsProps, State> {
    constructor(props: SidebarHeaderNotificationsProps) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    openModal = () => { this.setState({ isModalOpen: true }); };
    closeModal = () => { this.setState({ isModalOpen: false }); };

    render() {
        let fontAwesome = this.props.status === 'snoozing' ? 'clock-o' : 'bell-o';
        let tooltipData = {'orientation': 's', 'primary': 'Notifications'};
        return (
            <div>
                <NotificationsModal isOpen={this.state.isModalOpen} contentLabel="Modelly" closeModal={this.closeModal} />
                <Tooltip data={tooltipData}>
                    <i 
                        onClick={this.openModal}
                        className={`fa fa-${fontAwesome} SidebarHeaderNotifications-bell`}
                        aria-hidden="true"
                    />
                </Tooltip>
            </div>
        );
    }
}

export default SidebarHeaderNotifications;