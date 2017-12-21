import * as React from 'react';
import { gql, graphql, QueryProps, MutationFunc } from 'react-apollo';
import { OperationVariables } from 'react-apollo/types';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import Glitch from './Glitch';
import Error from './Error';
import TeamEntryForm from './TeamEntryForm';
import './TeamEntry.css';

interface State {
    error: boolean;
}

interface ParentProps {
    location: {
        pathname: string
    };
}

type MutationPayload = {
    teamLogin: {
        ok: boolean;
    }
};
  
type MutationInput = {
    url: string;
    password: string; 
    email: string
 };
  
interface AllProps extends ParentProps {
    data?: QueryProps<OperationVariables> & Partial<{ teamFromUrl: {
        ok: boolean;
        name: string;
        url: string;
    } }>;
    mutate: MutationFunc<MutationPayload, MutationInput>;
}  

class TeamEntry extends React.Component<AllProps, State> {
    state = {
        error: false
    };

    teamLogin = this.props.mutate;

    setError = (error: boolean) => setTimeout(() => this.setState({error}), 1000) && null;
    // maybe I can pass in a function to the form, onResponse. It will deal with 
    // this is definitly better than what i have now, because responsibility for 
    // how to deal with graphql query should be in the same place as the component making 
    // the queries. 

    render() {
        const data = this.props.data;
        if (!data || !data.teamFromUrl || data.teamFromUrl.ok === undefined) { return null; }
        const response = data.teamFromUrl;
        if (!response.ok!) { return <Glitch />; }
        const {state, props, setError} = this;
        return (
            <div className="TeamEntry">
                <WelcomeHeader />
                <Error visable={state.error}>
                    Sorry, you entered an incorrect email address or password.       
                </Error>
                <div className="TeamEntryMain">
                    <h1>Sign in to {response.name}</h1>
                    <h4>liv3ly.herokuapp.com/{response.url}</h4>
                    <h5>Enter your <b>email address</b> and <b>password.</b></h5>
                    <TeamEntryForm 
                        teamLogin={props.mutate} 
                        setError={setError} 
                        url={response.url}
                    />
                </div>
                <p>Trying to create a workspace? <a href="#">Create a new workspace</a></p>
                <WelcomeFooter />
            </div>
        );
    }
}

// GQL 

const teamFromUrl = gql`
    query teamFromUrl($url: String!) {
        teamFromUrl(input:{url: $url}) {
            name
            url
            ok
        }
    }
`;

const teamLogin = gql`
    mutation teamLogin($email: String!, $password: String!, $url: String!) {
        teamLogin(input: {email: $email, password: $password, url: $url}) {
            ok
            user {
                username
                id 
                email
            }
        }
    }
`;

// trouble figuring out this time and composing the queries
export default graphql<{}, any>( // tslint:disable-line 
    teamFromUrl,
    {
    options: ownProps => (
            {
                variables: {
                    url: ownProps.match.params.team 
                }
            }
        )
    }
)((graphql(teamLogin))(TeamEntry));
