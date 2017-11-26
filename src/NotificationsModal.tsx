import * as React from 'react';
import ReactModal from 'react-modal';

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
        'z-index': 998,
        'background': 'blue'
    };
    render() {
        return (
        <ReactModal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.closeModal}
            style={{ overlay: this.overlayStyle, content: {} }}
            contentLabel="Example Modal"
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
            bodyOpenClassName="ReactModal__Body--open"
            ariaHideApp={true}
            shouldCloseOnOverlayClick={true}
            parentSelector={() => document.body}
        >
                IM THE MODAL ITS MEEE
        </ReactModal>
    );
    }
}

export default NotificationsModal;