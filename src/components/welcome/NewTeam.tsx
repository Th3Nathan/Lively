import * as React from 'react';
import { gql, graphql, compose, QueryProps, MutationFunc } from 'react-apollo';
import { OperationVariables } from 'react-apollo/types';
import Error from './Error';
import { NewTeamButton } from './Buttons'; 
import { newUserDisplay, existingUserDisplay } from './displays';
import './NewTeam.css';
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
}

class NewTeam extends React.Component<AllProps, State> {
    state = {
        email: '', 
        username: '', 
        password: '', 
        ready: false, 
        error: false, 
        errorMsg: ''
    };
    url = this.props.location.pathname;
    getDisplay = () => (
        this.url === '/createnew' ? newUserDisplay() : existingUserDisplay()
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
        let mutation = (this.url === '/createnew') ? 'createUser' : 'loginUser';
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

    render() {
        const {username, password, email, errorMsg, ready} = this.state;
        const {handleSubmit, handleChange, getDisplay} = this;
        return (
            <div className="NewTeam">
                <div className="NewTeamHeader">
                    <img src={logo}/>
                    <h2>Lively</h2>
                </div>
                <div className="NewTeamMain">
                    {getDisplay()}
                    <form action="post" onSubmit={handleSubmit}>
                        <div className="NewTeamMainLabel"><b>Your email</b></div>
                        <input 
                            placeholder="you@example.com" 
                            name="email"
                            type="text" 
                            value={email}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        <div className="NewTeamMainLabel"><b>Display name</b></div>
                        <input 
                            placeholder="Display name" 
                            name="username"
                            type="text" 
                            value={username}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        <div className="NewTeamMainLabel"><b>Password</b></div>
                        <input 
                            placeholder="Display name" 
                            name="password"
                            type="password" 
                            value={password}
                            onChange={handleChange}
                            spellCheck={false}
                        />
                        <div className="NewTeamButtonWrap">
                        <div className="NewTeamError">
                            <Error visable={errorMsg !== ''}>
                                {errorMsg}
                            </Error>
                        </div>
                        <NewTeamButton enabled={ready} msg="Submit" />
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