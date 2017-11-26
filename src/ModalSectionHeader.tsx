
import * as React from 'react';
import './ModalSectionHeader.css';


export interface Props {
    text: String;
}

class ModalSectionHeader extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

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

