import * as React from 'react';
import './Signin.css';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import { gql, graphql } from 'react-apollo';
import {Submit, Loading} from './Buttons';
import Error from './Error';
export interface GraphQLProps {
    mutate: (input: any) => Promise<any>;
}

class Signin extends React.Component<any, {}> {
    state = {url: '', error: false, loading: false};
    doesTeamExist = this.props.mutate;

    handleChange = (e: React.SyntheticEvent<any>): void => {
        this.setState({url: e.currentTarget.value as HTMLInputElement});
    }

    handleSubmit = async (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({ loading: true });
        const newState = { error: false, loading: false };
        const url = this.state.url;
        try {
            let response = await this.doesTeamExist({ variables: { url } });
            newState.error = !response.data.doesTeamExist;
        } catch (err) {
            return err;
        } finally {
            setTimeout(() => {
                this.setState(newState);
                if (!newState.error) {
                    this.props.history.push(this.state.url)
                };
            }, 1000);
        }
    }

    render() {
        return (
            <div className="Signin">
                <WelcomeHeader />
                <Error visable={this.state.error}>
                    <b>We couldn't find your workspace. </b>
                     If you haven't created a workspace and just want to explore, you can&nbsp; 
                     <a href="#">try the demo</a>       
                </Error>
                <div className="SigninMain">
                    <h1>Sign in to your workspace</h1>
                    <h5>Enter your workspace's <b>Lively URL</b></h5>
                    <form action="post" onSubmit={this.handleSubmit}> 
                        <div className="SigninInputWrap">
                            <div>lively.com/</div>
                            <input 
                                placeholder="your-workspace-url" 
                                type="text" 
                                value={this.state.url} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                        </div>
                        {this.state.loading ? Loading() : Submit("arrow-right","Continue")}
                    </form>
                    <p>Don't know your workspace URL? <a href="#">Find your workspace</a></p>
                </div>
                <p>Need to get your group started on Lively? <a href="#">Create a new workspace</a></p>
                <WelcomeFooter />
            </div>
        );
    }
}

// GQL 

const doesTeamExist = gql`
    mutation($url: String!){   
        doesTeamExist(input: {url: $url})
    }
`;

export default graphql(doesTeamExist)(Signin);
