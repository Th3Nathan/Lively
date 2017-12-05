import * as React from 'react';
import './TeamEntry.css';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import Glitch from './Glitch';
import { gql, graphql } from 'react-apollo';
import Error from './Error';
import TeamEntryForm from './TeamEntryForm';

class TeamEntry extends React.Component<any, any> {
    state = {
        error: false
    };

    loginUser = this.props.mutate;

    setError = (error: boolean) => setTimeout(() => this.setState({error}), 1000);

    render() {
        if (this.props.data.loading === true) return null;
        const {data} = this.props;
        if (data.teamFromUrl.ok === false) return <Glitch />;
        const {error} = this.state;
        return this.props.data.loading ? null : (
            <div className="TeamEntry">
                <WelcomeHeader />
                <Error visable={error}>
                    Sorry, you entered an incorrect email address or password.       
                </Error>
                <div className="TeamEntryMain">
                    <h1>Sign in to {data.teamFromUrl.name}</h1>
                    <h4>{data.teamFromUrl.url}</h4>
                    <h5>Enter your <b>email address</b> and <b>password.</b></h5>
                    <TeamEntryForm 
                        loginUser={this.props.mutate} 
                        data={this.props.data} 
                        setError={this.setError} 
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

const loginUser = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(input: {email: $email, password: $password}) {
            ok
            user {
                username
                id 
                email
            }
        }
    }
`;

export default graphql(teamFromUrl, 
    {options: (ownProps: any) => {
        return {
            variables: 
                {url: ownProps.match.params.team }
            }
        }
    }
)((graphql(loginUser))(TeamEntry));
