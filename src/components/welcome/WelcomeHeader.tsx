import * as React from 'react';
import './WelcomeHeader.css';

const logo = require('../../assets/logo.png');

class WelcomeHeader extends React.Component {
    render() {
        return (
            <div className="WelcomeHeader">
                <a href="/" className="WelcomeHeaderLink flex">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </a>
                <div className="WelcomeNavs flex">
                    <a href="/newteam">
                        Create a new workspace
                    </a>
                    <a href="#"> 
                        Try a demonstration
                    </a>
                </div>
            </div> 
        );
    }
}
export default WelcomeHeader;