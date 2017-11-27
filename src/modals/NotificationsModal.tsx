import * as React from 'react';
import ReactModal from 'react-modal';
import ModalSectionHeader from './ModalSectionHeader';
import { closeNotificationsModal } from '../redux/actions/index';
import './NotificationsModal.css';

export interface ConnectProps {
    isOpen: boolean;
    closeNotificationsModal: () => void;
}

export interface ParentProps {}

class NotificationsModal extends React.Component<ConnectProps & ParentProps> {
    // constructor(props) {
    //     super(props);
    // }

    // default styles in App.css 
    overlayStyle = {};

    modalStyle = {
        'top': '39px',
        'left': '172px',
        'border-radius': '12px',
        'width': '260px',
        'padding': '17px 0px',
        'box-shadow': '0 5px 10px rgba(0,0,0,.12)',
        'border': '1px solid rgba(0,0,0,.15)',
    };

    snoozeTimes = [
        {text: '20 minutes', seconds: 1200}, 
        {text: '1 hour', seconds: 3600}, 
        {text: '2 hours', seconds: 7200}, 
        {text: '4 hours', seconds: 14400}, 
        {text: '24 hours', seconds: 86400} 
    ];

    constructList = () => {
        return this.snoozeTimes.map((snoozeTime, idx) => {
            let action = () => {
                this.props.closeNotificationsModal();
                // this.props.setSnoozeUntil(snoozeTime.seconds)
            }
            return (
                <li onClick={action}>
                    {snoozeTime.text}
                </li>
            )
        });
    }

    render() {
        return (
        <ReactModal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.closeNotificationsModal}
            style={{ overlay: this.overlayStyle, content: this.modalStyle }}
            contentLabel="Example Modal"
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
            bodyOpenClassName="ReactModal__Body--open"
            shouldCloseOnOverlayClick={true}
            parentSelector={() => document.body}
        >
            <ModalSectionHeader text={'Snooze notification:'}/>
            <ul className="NotificationsModal-options">
                {this.constructList()}
            </ul>
        </ReactModal>
    );
    }
}

// REDUX 

import { StoreState } from '../redux/types/index';
import { connect, Dispatch } from 'react-redux';
import { NotificationsModalActions } from '../redux/actions/index';

let mapStateToProps = (state: StoreState, ownProps: ParentProps) => {
    return {
        isOpen: state.modals.NotificationsModal.open 
    };
};

let mapDispatchToProps = (dispatch: Dispatch<NotificationsModalActions>) => {
    return {
        closeNotificationsModal: () => dispatch(closeNotificationsModal())
    };
};

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect<{}, {}, ParentProps> (mapStateToProps, mapDispatchToProps) (NotificationsModal);
