import * as React from 'react';
import './SidebarHeaderNotifications.css';
import { openNotificationsModal } from './actions/index';
import Tooltip from './Tooltip';

export interface SidebarHeaderNotificationsProps extends React.Props<any> {
    isOpen: boolean;
    openNotificationsModal: () => void;
}

export interface ExtendedProps extends React.Props<any> {
    status: String;
}
class SidebarHeaderNotifications extends React.Component<SidebarHeaderNotificationsProps & ExtendedProps, any> {

    render() {
        debugger
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


let mapStateToProps = (state: StoreState, ownProps: ExtendedProps) => {
    return {
        isOpen: state.modals.NotificationsModal.open,
        status: ownProps.status
    }
}

let mapDispatchToProps = (dispatch: Dispatch<NotificationsModalActions>) => {
    return {
        openNotificationsModal: () => dispatch(openNotificationsModal())
    }
}

export default connect<{}, {}, ExtendedProps> (mapStateToProps, mapDispatchToProps)  (SidebarHeaderNotifications);