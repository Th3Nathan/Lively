import * as React from 'react';
import './WelcomeFooter.css';

class WelcomeFooter extends React.Component {
    render() {
        return (
            <div className="WelcomeFooter">
                <div className="WelcomeFooterLinks">
                    <a 
                        href="https://www.linkedin.com/in/nathan-vass-4b9490132/" 
                        className="WelcomeFooterItem"
                    >
                        LinkedIn
                    </a>
                    <a 
                        href="http://www.nathanvass.site/" 
                        className="WelcomeFooterItem"
                    >
                        Portfolio
                    </a>
                    <a 
                        href="https://angel.co/nathan-vass?public_profile=1"
                        className="WelcomeFooterItem"
                    >
                        AngelList
                    </a>
                    <a 
                        href="https://github.com/th3nathan" 
                        className="WelcomeFooterItem"
                    >
                        Github
                    </a>
                </div>
            </div>
        );
    }
}
export default WelcomeFooter;