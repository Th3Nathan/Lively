import * as React from 'react';
import './SidebarHeaderNotifications.css';
import { openNotificationsModal } from '../redux/actions/index';
import Tooltip from '../wrappers/Tooltip';

export interface ConnectProps {
    isOpen: boolean;
    openNotificationsModal: () => void;
}

export interface ParentProps {
    status: String;
}

class SidebarHeaderNotifications extends React.Component<ConnectProps & ParentProps> {
    render() {
        let fontAwesome = this.props.status === 'snoozing' ? 'clock-o' : 'bell-o';
        let tooltipData = {'orientation': 's', 'primary': 'Notifications'};
        let style = this.props.isOpen ? {'color': 'white'} : {};
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
import { NotificationsModalActions } from '../redux/actions/index';
import { StoreState } from '../redux/types/index';

let mapStateToProps = (state: StoreState, ownProps: ParentProps) => {
    return {
        isOpen: state.modals.NotificationsModal.open,
        status: ownProps.status
    };
};

let mapDispatchToProps = (dispatch: Dispatch<NotificationsModalActions>) => {
    return {
        openNotificationsModal: () => dispatch(openNotificationsModal())
    };
};

export default connect<{}, {}, ParentProps> (mapStateToProps, mapDispatchToProps)  (SidebarHeaderNotifications);