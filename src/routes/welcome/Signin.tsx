import * as React from 'react';
const logo = require('../../assets/logo.png');
import './Signin.css';
class Signin extends React.Component {
    state = {url: "", error: false, loading: false}

    handleChange = (e: any) => {
        this.setState({url: e.target.value})
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({loading: true, error: false})
        setTimeout(() => {
            this.setState({loading: false, error: true})
        }, 1000)
    }

    errorMessage = () => {
        return (
            <div className="SigninError">
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <p>
                    <b>We couldn't find your workspace. </b>
                    If you haven't created a workspace and just want to explore, you can&nbsp; 
                    <a href="#">try the demo</a>
                </p>
            </div>
        );
    }

    constructButton = () => (
        <button type="submit" className="SigninButton">
            Continue <span>
            <i className="fa fa-arrow-right" aria-hidden="true"/>
            </span>
        </button>        
    )


    constructLoading = () => (
        <button className="SigninLoading">
            Loading <span> 
            <i className="fa fa-spinner fa-spin fa-fw"></i>
            <span className="sr-only">Loading...</span>
            </span>
        </button>
    )
    render (){
        return (
            <div className="Signin">
                <div className="WelcomeHeader">
                    <div className="flex">
                        <img src={logo}/>
                        <h2>Lively</h2>
                    </div>
                    <div className="SigninNavs flex">
                        <div>
                            Create a new workspace
                        </div>
                        <div> 
                            Try a demonstration
                        </div>
                    </div>
                </div> 
                {this.state.error ? this.errorMessage() : null }
                <div className="SigninMain">
                    <h1>Sign in to your workspace</h1>
                    <h5>Enter your workspace's <b>Lively URL</b></h5>
                    <form action="post" onSubmit={this.handleSubmit}> 
                        <div>
                            <div>lively.com/</div>
                            <input 
                                placeholder="your-workspace-url" 
                                type="text" 
                                value={this.state.url} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                        </div>
                        {this.state.loading ? this.constructLoading() : this.constructButton()}
                    </form>
                    <p>Don't know your workspace URL? <a href="#">Find your workspace</a></p>
                </div>
                <p>Need to get your group started on Lively? <a href="#">Create a new workspace</a></p>
                <div className="WelcomeFooter">
                    <div className = "WelcomeFooterLinks">
                        <a href="https://www.linkedin.com/in/nathan-vass-4b9490132/" className="WelcomeFooterItem">
                            LinkedIn
                        </a>
                        <a href="http://www.nathanvass.site/" className="WelcomeFooterItem">
                            Portfolio
                        </a>
                        <a href="https://angel.co/nathan-vass?public_profile=1"className="WelcomeFooterItem">
                            AngelList
                        </a>
                        <a href="https://github.com/th3nathan" className="WelcomeFooterItem">
                            Github
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signin;