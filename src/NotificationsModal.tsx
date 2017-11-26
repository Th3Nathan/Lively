import * as React from 'react';
import ReactModal from 'react-modal';
import ModalSectionHeader from './ModalSectionHeader';

export interface Props {
    isOpen: boolean;
    closeModal: () => void;
    contentLabel: String;
}

export interface State {

}

class NotificationsModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    overlayStyle = {
        'top': '0px',
        'left': '0px',
        'right': '0px',
        'bottom': '0px',
        'position': 'absolute',
        'z-index': '998',
        'background': 'rgba(0, 0, 0, 0)',
        'cursor': 'default',

    };

    modalStyle = {
        'background': 'white',
        'top': '39px',
        'left': '172px',
        'border-radius': '12px',
        'width': '260px',
        'position': 'absolute',
        'height': '500px',
        'padding': '17px 0px',
        'box-sizing': 'border-box',
        'box-shadow': '0 5px 10px rgba(0,0,0,.12)',
        'border': '1px solid rgba(0,0,0,.15)',
        'outline': 'none'
    }
    render() {
        return (
        <ReactModal
            isOpen={true}
            onRequestClose={this.props.closeModal}
            style={{ overlay: this.overlayStyle, content: this.modalStyle }}
            contentLabel="Example Modal"
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
            bodyOpenClassName="ReactModal__Body--open"
            ariaHideApp={true}
            shouldCloseOnOverlayClick={true}
            parentSelector={() => document.body}
        >
            <ModalSectionHeader text={"Snooze notification:"}/>
            <ul className="NotificationsModal-options">
                <li>20 minutes</li>
                <li>1 hour</li>
                <li>2 hours</li>
                <li>4 hours</li>
                <li>8 hours</li>
                <li>24 hours</li>
            </ul>
        </ReactModal>
    );
    }
}

export default NotificationsModal;