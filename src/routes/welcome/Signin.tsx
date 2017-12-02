import * as React from 'react';

class Signin extends React.Component {
    state = {url: ""}

    render (){
        return (
            <div className="Signin">
                <div className="WelcomeHeader">
                    <img src="public/logo.png"/>
                    <h2>Lively</h2>
                </div> 
                <div className="SigninMain">
                    <h1>Sign in to your workspace</h1>
                    <h5>Enter your workspace's <em>Lively URL</em></h5>
                    <div>
                        <div>lively.com/</div>
                        <input type="text"></input>
                    </div>
                    <div className="SigninButton">
                        Continue <span className="arrow">arrow</span>
                    </div>
                    <p>Don't know your workspace URL? <a href="#">Find your workspace</a></p>
                </div>
                <p>Need to get your group started on Lively? <a href="#">Create a new workspace</a></p>
                <div className="WelcomeFooter">
                    <div className="WelcomeFooterItem">LinkedIn</div>
                    <div className="WelcomeFooterItem">Portfolio</div>
                    <div className="WelcomeFooterItem">AngelList</div>
                    <div className="WelcomeFooterItem">Github</div>
                </div>
            </div>
        );
    }
}
export default Signin;