import * as React from 'react';
import './NewTeam.css';
// import './Button.css';
import {NewTeamButton} from './welcome/Buttons'; 
import {validateEmail} from '../util';
import Error from './welcome/Error';
const logo = require('../assets/logo.png');

class NewTeam extends React.Component<any, any> {

    state = {email: '', username: '', password: '', ready: false, error: false}
    handleChange = (e: any) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value})
        if (this.allValid()) {
            this.setState({ready: true})
        } else {
            this.setState({ready: false})
        }
    }

    allValid = () => {
        const {username, password, email} = this.state;
        let validEmail = validateEmail(email);
        let validUsername = (username.length >= 2 && username.length < 25);
        let validPassword = (password.length >= 5 && password.length < 25);
        return validEmail && validUsername && validPassword;
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.setState({ready: false});
        setTimeout(() => this.setState({ready: true}), 1500)
        let user = (({username, password, email}) => (
            {username, password, email}))(this.state);
        console.log(user);
    }

    render() {
        let {username, password, email, error} = this.state;
        return (
            <div className="NewTeam">
                <div className="NewTeamHeader">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </div>
                <Error visable={error}>
                    {/* you know what to render, the error from the server */}
                </Error>
                <div className="NewTeamMain">
                    <h1>Introduce Yourself!</h1>
                    <p>Please enter your email, a password, and a display name, how your teammates on Lively will see and refer to you</p>
                    <form action="post" onSubmit={this.handleSubmit}>
                        <div className="NewTeamMainLabel"><b>Your email</b></div>
                        <input 
                            placeholder="you@example.com" 
                            name="email"
                            type="text" 
                            value={email}
                            onChange={this.handleChange}
                            spellCheck={false}
                        />
                        <div className="NewTeamMainLabel"><b>Display name</b></div>
                        <input 
                            placeholder="Display name" 
                            name="username"
                            type="text" 
                            value={username}
                            onChange={this.handleChange}
                            spellCheck={false}
                        />
                        <div className="NewTeamMainLabel"><b>Password</b></div>
                        <input 
                            placeholder="Display name" 
                            name="password"
                            type="password" 
                            value={password}
                            onChange={this.handleChange}
                            spellCheck={false}
                        />
                        <div className="NewTeamButtonWrap">
                        <NewTeamButton type="submit" enabled={this.state.ready} msg="Create Team" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewTeam;


