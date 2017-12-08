import * as React from 'react';
import './NewTeam.css';
import { gql, graphql, compose, QueryProps, MutationFunc } from 'react-apollo';
import { NewTeamButton } from './welcome/Buttons'; 
import Error from './welcome/Error';
import { OperationVariables } from 'react-apollo/types';
const logo = require('../assets/logo.png');

const newUserDisplay = () => (
    <div>
        <h1>Introduce Yourself!</h1>
        <p>
            Please enter your email, a password, and a display name,
             how your teammates on Lively will see and refer to you
        </p>
        <p>Already have an account? <a href="/createexisting">login to create a workspace</a></p>
    </div>
);

const existingUserDisplay = () => (
    <div>
        <h1>Welcome Back!</h1>
        <p>Please log in with your credentials to create a new workspace.</p>
        <p>Don't have an account? <a href="/createnew">signup to create your first workspace</a></p>
    </div>
);

interface ParentProps {
    location: {
        pathname: string
    };
}

interface Response {
    ok: boolean;
    error: {
        message: string
    };
    user: {
        username: string;
        id: number;
        email: string;
    };    
}

interface AllProps extends ParentProps {
    data?: QueryProps<OperationVariables> & Partial<{ loginUser: Response, createUser: Response }>;
    mutate?: MutationFunc<{}, OperationVariables> | undefined; 
} 

interface State {
    email: string;
    username: string;
    password: string;
    ready: boolean;
    error: boolean;
    errorMsg: string;
}

class NewTeam extends React.Component<AllProps, State> {
    state = {email: '', username: '', password: '', ready: false, error: false, errorMsg: ''};
    
    getDisplay = () => {
        if (this.props.location.pathname === '/createnew') {
            return newUserDisplay(); 
        } else {
            return existingUserDisplay();
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        let newState = this.state;
        newState[e.currentTarget.name] = e.currentTarget.value;
        this.setState(newState);
        if (this.allValid(newState)) {
            this.setState({ready: true});
        } else {
            this.setState({ready: false});
        }
    }

    allValid = (newState: State) => {
        const {username, password, email} = newState;
        return username && email && password;
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ready: false});
        let user = (({username, password, email}) => (
            {username, password, email}))(this.state);
        let mutation = (this.props.location.pathname === '/createnew') ? 'createUser' : 'loginUser';
        let response = await this.props[mutation]({variables: user});
        let errorMsg = response.data[mutation].ok ? '' : response.data[mutation].error.message;
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