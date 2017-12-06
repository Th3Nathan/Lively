import * as React from 'react';
import './NewTeam.css';
import { gql, graphql, compose } from 'react-apollo';
import {NewTeamButton} from './welcome/Buttons'; 
import Error from './welcome/Error';
const logo = require('../assets/logo.png');

const newUserDisplay = () => (
    <div>
        <h1>Introduce Yourself!</h1>
        <p>Please enter your email, a password, and a display name, how your teammates on Lively will see and refer to you</p>
        <p>Already have an account? <a href="#">login to create a workspace</a></p>
    </div>
);

const existingUserDisplay = () => (
    <div>
        <h1>Welcome Back!</h1>
        <p>Please log in with your credentials to create a new workspace.</p>
        <p>Don't have an account? <a href="#">signup to create your first workspace</a></p>
    </div>
);

class NewTeam extends React.Component<any, any> {
    state = {email: '', username: '', password: '', ready: false, error: false, errorMsg: ''}
    
    getDisplay = () => {
        if (this.props.location.pathname === '/createnew') {
            return newUserDisplay(); 
        } else {
            return existingUserDisplay();
        }
    }

    handleChange = (e: any) => {
        let newState = this.state;
        newState[e.currentTarget.name] = e.currentTarget.value;
        this.setState(newState);
        if (this.allValid(newState)) {
            this.setState({ready: true})
        } else {
            this.setState({ready: false})
        }
    }

    allValid = (newState: any) => {
        const {username, password, email} = newState;
        return username && email && password;
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        this.setState({ready: false});
        let user = (({username, password, email}) => (
            {username, password, email}))(this.state);
        let mutation = (this.props.location.pathname === '/createnew') ? 'createUser' : 'loginUser';
        let response = await this.props[mutation]({variables: user});
        let errorMsg = response.data[mutation].ok ? '' : response.data[mutation].error.message
        console.log(response);
        this.setState({errorMsg, ready: true});
    }

    render() {
        let {username, password, email} = this.state;
        return (
            <div className="NewTeam">
                <div className="NewTeamHeader">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </div>
                <div className="NewTeamMain">
                    {this.getDisplay()}
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
                        <div className="NewTeamError">
                            <Error visable={this.state.errorMsg !== ''}>
                                {this.state.errorMsg}
                            </Error>
                        </div>
                        <NewTeamButton type="submit" enabled={this.state.ready} msg="Create Team" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


const createUser = gql`
mutation createUser($email: String!, $password: String!, $username: String!) {
    createUser(input: {email: $email, password: $password, username: $username}) {
        ok
        error {
            message
        }
        user {
            username
            id 
            email
        }
    }
}
`;

const loginUser = gql`
mutation createUser($email: String!, $password: String!, $username: String!) {
    loginUser(input: {email: $email, password: $password, username: $username}) {
        ok
        error {
            message
        }
        user {
            username
            id 
            email
        }
    }
}
`;
export default compose (
graphql(loginUser, {name: 'loginUser'}),
graphql(createUser, {name: 'createUser'}),
)(NewTeam);