import * as React from 'react';
import { gql, graphql, compose, QueryProps, MutationFunc } from 'react-apollo';
import { OperationVariables } from 'react-apollo/types';
import Error from './Error';
import { handleTokens } from './../../util';
import { SessionButton } from './Buttons'; 
import { NewUserDisplay, ExistingUserDisplay } from './displays';
import './Session.css';
const logo = require('../../assets/logo.png');

interface ParentProps {
    location: {
        pathname: string
    };
    history: {
        push: (url: string) => void;
    };
}

interface Response {
    ok: boolean;
    errors: [{message: string}];
    token: String;
    refreshToken: String;
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
    errorMsg: string;
}

class Session extends React.Component<AllProps, State> {
    state = {
        email: '', 
        username: '', 
        password: '', 
        ready: false, 
        errorMsg: '',
    };

    url = this.props.location.pathname;

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        let newState = this.state;
        newState[e.currentTarget.name] = e.currentTarget.value;
        newState = {...newState, ready: this.allValid(newState)};
        this.setState(newState);
    }

    allValid = ({username, password, email}: State) => {
        if (this.url === '/signup') {
            return !!(username && email && password);
        } else {
            return !!(email && password);
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ready: false});
        let user = (({username, password, email}) => (
            {username, password, email}))(this.state);
        let mutation = (this.url === '/signup') ? 'createUser' : 'loginUser';
        try {
            // try to authenticate
            let response = await this.props[mutation]({variables: user});
            let data = response.data[mutation];
            let errorMsg = data.ok ? '' : data.errors[0].message;
            if (data.ok) {
                handleTokens({
                    token: data.token,
                    refreshToken: data.refreshToken,
                });
                this.props.history.push('newteam');
            } else {
                setTimeout(
                    () => this.setState({errorMsg, ready: true}),
                    1000
                );
            }
        } catch (err) {
            throw 'Problem connecting with server!';
        }
    }

    render() {
        const {username, password, email, errorMsg, ready} = this.state;
        const {handleSubmit, handleChange, url} = this;
        return (
            <div className="Session">
                <div className="SessionHeader">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </div>
                <div className="SessionMain">
                    {this.url === '/signup' ? <NewUserDisplay /> : <ExistingUserDisplay />}
                    <form action="post" onSubmit={handleSubmit}>
                        <div className="SessionMainLabel"><b>Your email</b></div>
                        <input 
                            placeholder="you@example.com" 
                            name="email"
                            type="text" 
                            value={email}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        {url === '/signin' ? null : (

                            <div className="SessionMainLabel"><b>Display name</b>
                            <input 
                                style={{margin: '14px 0px 11px 0px'}}
                                placeholder="Display name" 
                                name="username"
                                type="text" 
                                value={username}
                                onChange={handleChange}
                                spellCheck={false}
                            />
                            </div>
                        )
                        }
                        <div className="SessionMainLabel"><b>Password</b></div>
                        <input 
                            placeholder="Enter Password" 
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
        errors {
            message
        }
        user {
            username
            id 
            email
        }
        token
        refreshToken
    }
}
`;

const loginUser = gql`
mutation createUser($email: String!, $password: String!, $username: String!) {
    loginUser(input: {email: $email, password: $password, username: $username}) {
        ok
        errors {
            message
        }
        user {
            username
            id 
            email
        }
        token
        refreshToken
    }
}
`;
export default compose (
graphql(loginUser, {name: 'loginUser'}),
graphql(createUser, {name: 'createUser'}),
)(Session);