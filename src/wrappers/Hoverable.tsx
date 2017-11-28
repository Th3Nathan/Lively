import * as React from 'react';
import './Hoverable.css';

interface State {
    hovering: Boolean;
}

interface Props {
    // tslint:disable-next-line: no-any
    children?: any;
}

class Hoverable extends React.Component<Props, State> {
    state = {hovering: false};

    handleMouseIn = () => {
        this.setState({hovering: true});    
    }

    handleMouseOut = () => {
        this.setState({hovering: false});
    }

    render() {
        return (
            <div 
                className="Hoverable"
                onMouseEnter={this.handleMouseIn}
                onMouseLeave={this.handleMouseOut}
            >
                {this.props.children(this.state)}
            </div>
        );
    }
}

export default Hoverable;