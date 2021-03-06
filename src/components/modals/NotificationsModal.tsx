import * as React from 'react';
import ReactModal from 'react-modal';
import ModalSectionHeader from './ModalSectionHeader';
import { closeNotificationsModal } from '../../redux/actions/index';
import './NotificationsModal.css';

export interface ConnectProps {
    isOpen: boolean;
    closeNotificationsModal: () => void;
}

class NotificationsModal extends React.Component<ConnectProps> {
    modalStyle = {
        'top': '39px',
        'left': '172px',
        'borderRadius': '12px',
        'width': '260px',
        'padding': '17px 0px',
        'boxShadow': '0 5px 10px rgba(0,0,0,.12)',
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
        const action = () => this.props.closeNotificationsModal();
            // this.props.setSnoozeUntil(snoozeTime.seconds)
        return this.snoozeTimes.map((snoozeTime, idx) => {
            return (
                <li onClick={action} key={idx}>
                    {snoozeTime.text}
                </li>
            );
        });
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.closeNotificationsModal}
                style={{ overlay: {}, content: this.modalStyle }}
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

import { StoreState } from '../../redux/types/index';
import { connect, Dispatch } from 'react-redux';
import { NotificationsModalActions } from '../../redux/actions/index';

const mapStateToProps = (state: StoreState) => ({
    isOpen: state.modals.NotificationsModal.open 
});

const mapDispatchToProps = (dispatch: Dispatch<NotificationsModalActions>) => ({
    closeNotificationsModal: () => dispatch(closeNotificationsModal())
});

export default connect<{}, {}, {}> (mapStateToProps, mapDispatchToProps) (NotificationsModal);
