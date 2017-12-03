import * as React from 'react';
import './WelcomeHeader.css';
const logo = require('../../assets/logo.png');

class WelcomeHeader extends React.Component {
    render() {
        return (
            <div className="WelcomeHeader">
                <div className="flex">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </div>
                <div className="WelcomeNavs flex">
                    <div>
                        Create a new workspace
                    </div>
                    <div> 
                        Try a demonstration
                    </div>
                </div>
            </div> 
        );
    }
}
export default WelcomeHeader;