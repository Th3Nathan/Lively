import * as React from 'react';
import './ModalSectionHeader.css';

interface Props {
    text: String;
}

class ModalSectionHeader extends React.Component<Props, {}> {
    render() {
        return (
            <div className="ModalSectionHeader">
                <p>{this.props.text}</p>
                <hr/>
            </div>
        );
    }
}

export default ModalSectionHeader;