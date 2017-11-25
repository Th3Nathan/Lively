import * as React from 'react';
import './Hoverable.css';

interface State {
    hovering: Boolean;
}

interface Props {
    render: Function;
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
              {this.props.render(this.state)}
            </div>
        );
    }
}

export default Hoverable;