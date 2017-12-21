import * as React from 'react';
import { gql, graphql, compose, QueryProps, MutationFunc } from 'react-apollo';
import { OperationVariables } from 'react-apollo/types';
import Error from './Error';
import { SessionButton } from './Buttons'; 
import { newUserDisplay, existingUserDisplay } from './displays';
import './Session.css';
const logo = require('../../assets/logo.png');

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
    hasNameBeenFocused: boolean;
}

class Session extends React.Component<AllProps, State> {
    state = {
        email: '', 
        username: '', 
        password: '', 
        ready: false, 
        error: false, 
        errorMsg: '',
        hasNameBeenFocused: false,
    };

    url = this.props.location.pathname;

    getDisplay = () => (
        this.url === '/signup' ? newUserDisplay() : existingUserDisplay()
    )

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        let newState = this.state;
        newState[e.currentTarget.name] = e.currentTarget.value;
        newState = Object.assign(newState, {ready: this.allValid(newState)});
        this.setState(newState);
    }

    allValid = ({username, password, email}: State) => (
        username && email && password
    )

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ready: false});
        let user = (({username, password, email}) => (
            {username, password, email}))(this.state);
        let mutation = (this.url === '/signup') ? 'createUser' : 'loginUser';
        try {
            let response = await this.props[mutation]({variables: user});
            let data = response.data[mutation];
            let errorMsg = data.ok ? '' : data.error.message;
            setTimeout(
                () => this.setState({errorMsg, ready: true}),
                1000
            );
        } catch (err) {
            throw 'Disconnected from server'; // redirect to glitch page would be better
        }
    }

    handleFocus = () => this.setState({hasNameBeenFocused: true});

    render() {
        const {username, password, email, errorMsg, ready, hasNameBeenFocused} = this.state;
        const {handleSubmit, handleChange, handleFocus, getDisplay} = this;
        return (
            <div className="Session">
                <div className="SessionHeader">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </div>
                <div className="SessionMain">
                    {getDisplay()}
                    <form action="post" onSubmit={handleSubmit}>
                        <div className="SessionMainLabel"><b>Your email</b></div>
                        <input 
                            placeholder="you@example.com" 
                            name="email"
                            type="text" 
                            value={email}
                            onChange={handleChange}
                            spellCheck={false}
                            autoComplete="off"
                        />
                        <div className="SessionMainLabel"><b>Display name</b></div>
                        <input 
                            placeholder="Display name" 
                            name="username"
                            type="text" 
                            value={username}
                            onChange={handleChange}
                            spellCheck={false}
                            readOnly={!hasNameBeenFocused}
                            onFocus={handleFocus}
                        />
                        <div className="SessionMainLabel"><b>Password</b></div>
                        <input 
                            placeholder="Display name" 
                            name="password"
                            type="password" 
                            value={password}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        <div className="SessionButtonWrap">
                        <div className="SessionError">
                            <Error visable={errorMsg !== ''}>
                                {errorMsg}
                            </Error>
                        </div>
                        <SessionButton enabled={ready} msg="Submit" />
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
)(Session);