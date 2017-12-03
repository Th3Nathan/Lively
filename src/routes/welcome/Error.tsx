import * as React from 'react';
import './Error.css';
class Error extends React.Component<any> {
    render() {
        if (!this.props.visable) return null;
        return (
            <div className="Error">
                <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                <p>
                    {this.props.children}
                </p>
            </div>
        )
    }
}

export default Error;
