import * as React from 'react';
import './SidebarHeaderNotifications.css';
import { openNotificationsModal } from './actions/index';

import Tooltip from './Tooltip';

export interface SidebarHeaderNotificationsProps {
    status: String;
    isOpen: boolean;
    openNotificationsModal: () => void;
}


class SidebarHeaderNotifications extends React.Component<SidebarHeaderNotificationsProps, {}> {

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
                    aria-hidden="true"
                />
            </Tooltip>
        );
    }
}


import { connect, Dispatch } from 'react-redux';
import { NotificationsModalActions } from './actions/index';
import { StoreState } from './types/index';


let mapStateToProps = (state: StoreState) => {
    return {
        isOpen: state.modals.NotificationsModal.open 
    }
}

let mapDispatchToProps = (dispatch: Dispatch<NotificationsModalActions>) => {
    return {
        openNotificationsModal: () => dispatch(openNotificationsModal())
    }
}

// I guess connect wasnt passing down some default props that sidebarheader needed. this is insane
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SidebarHeaderNotifications);