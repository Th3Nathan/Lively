import * as React from 'react';
import './Error.css';

interface Props {
    visable: boolean;
}

class Error extends React.Component<Props> {
    render() {
        return !this.props.visable ? null :
         (
            <div className="Error">
                <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                <p>
                    {this.props.children}
                </p>
            </div>
        );
    }
}

export default Error;
