import * as React from 'react';
import './TeamEntry.css';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import Glitch from './Glitch';
import { gql, graphql, QueryProps, MutationFunc } from 'react-apollo';
import Error from './Error';
import TeamEntryForm from './TeamEntryForm';
import { OperationVariables } from 'react-apollo/types';
// import { OperationVariables } from 'react-apollo/types';

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
        if (!this.props.data) { return null; }
        if (this.props.data.loading === true) { return null; }
        const data = this.props.data.teamFromUrl;
        if (!data) { return null; }
        if (!data.ok) { return <Glitch />; }
        const {error} = this.state;
        return (
            <div className="TeamEntry">
                <WelcomeHeader />
                <Error visable={error}>
                    Sorry, you entered an incorrect email address or password.       
                </Error>
                <div className="TeamEntryMain">
                    <h1>Sign in to {data.name}</h1>
                    <h4>{data.url}</h4>
                    <h5>Enter your <b>email address</b> and <b>password.</b></h5>
                    <TeamEntryForm 
                        teamLogin={this.props.mutate} 
                        setError={this.setError} 
                        url={data.url}
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

// couldnt figure out this type
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
