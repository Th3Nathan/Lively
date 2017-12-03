import * as React from 'react';
import './TeamEntry.css';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import { gql, graphql } from 'react-apollo';
import {Submit, Loading} from './Buttons';
import Error from './Error';

class TeamEntry extends React.Component<any, {}> {
    state = {email: '', password: '', error: false, loading: false};

    handleChange = (e: React.SyntheticEvent<any>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value as HTMLInputElement
        });
    }

    handleSubmit = async (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({ loading: true });
        const newState = { error: false, loading: false };
        try {
            // let response = await this.doesTeamExist({ variables: { url } });
            // newState.error = !response.data.doesTeamExist;
        } catch (err) {
            return err;
        } finally {
            setTimeout(() => this.setState(newState), 1000);
        }
    }

    render() {
        console.log(this.props.data)
        return this.props.data.loading ? null : (
            <div className="TeamEntry">
                <WelcomeHeader />
                <Error visable={this.state.error}>
                    <b>We couldn't find your workspace. </b>
                     If you haven't created a workspace and just want to explore, you can&nbsp; 
                     <a href="#">try the demo</a>       
                </Error>
                <div className="TeamEntryMain">
                    <h1>Sign in to {this.props.data.teamFromUrl.name}</h1>
                    <h4>{this.props.data.teamFromUrl.url}</h4>
                    <h5>Enter your <b>email address</b> and <b>password.</b></h5>
                    <form action="post" onSubmit={this.handleSubmit}> 
                        <div className="TeamEntryInputs">
                            <input 
                                placeholder="you@example.com" 
                                name="email"
                                type="text" 
                                value={this.state.email} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                            <input 
                                placeholder="password"
                                name="password" 
                                type="password" 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                        </div>
                        {this.state.loading ? Loading() : Submit(false,"Sign in")}
                    </form>
                </div>
                <p>Trying to create a workspace? <a href="#">Create a new workspace</a></p>
                <WelcomeFooter />
            </div>
        );
    }
}

// GQL 

const teamFromUrl = gql`
    query {
        teamFromUrl(input:{url:"app-academy"}) {
            name
            url
        }
    }
`;


export default graphql(teamFromUrl)(TeamEntry);
