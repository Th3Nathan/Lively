import * as React from 'react';
import { openNotificationsModal } from '../../redux/actions/index';
import Tooltip from '../wrappers/Tooltip';
import './SidebarHeaderNotifications.css';

interface ConnectProps {
    isOpen: boolean;
    openNotificationsModal: () => void;
}

interface ParentProps {
    status: string;
}

class SidebarHeaderNotifications extends React.Component<ConnectProps & ParentProps> {
    fontAwesome = this.props.status === 'snoozing' ? 'clock-o' : 'bell-o';
    tooltipData = {'orientation': 's', 'primary': 'Notifications'};
    style = this.props.isOpen ? {'color': 'white'} : {};

    render() {
        const {fontAwesome, tooltipData, style} = this;
        return (
            <Tooltip data={tooltipData}>
                <i 
                    style={style}
                    onClick={this.props.openNotificationsModal}
                    className={`fa fa-${fontAwesome} SidebarHeaderNotifications-bell`}
                />
            </Tooltip>
        );
    }
}

// REDUX

import { connect, Dispatch } from 'react-redux';
import { NotificationsModalActions } from '../../redux/actions/index';
import { StoreState } from '../../redux/types/index';

let mapStateToProps = (state: StoreState, ownProps: ParentProps) => ({
    isOpen: state.modals.NotificationsModal.open,
    status: ownProps.status
});

let mapDispatchToProps = (dispatch: Dispatch<NotificationsModalActions>) => ({
    openNotificationsModal: () => dispatch(openNotificationsModal())
});

export default connect<{}, {}, ParentProps> (mapStateToProps, mapDispatchToProps)(SidebarHeaderNotifications);