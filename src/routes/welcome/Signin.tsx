import * as React from 'react';
import './Signin.css';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import { gql, graphql } from 'react-apollo';

export interface GraphQLProps {
    mutate: (input: any) => Promise<any>
}

class Signin extends React.Component<GraphQLProps, {}> {
    state = {url: "", error: false, loading: false}
    doesTeamExist = this.props.mutate;

    handleChange = (e: React.SyntheticEvent<any>): void => {
        this.setState({url: e.currentTarget.value as HTMLInputElement})
    }

    handleSubmit = async (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        this.setState({ loading: true });
        const newState = { error: false, loading: false };
        const url = this.state.url;
        try {
            let response = await this.doesTeamExist({ variables: { url } });
            newState.error = !response.data.doesTeamExist;
        } catch(err) {
            console.log(err);
        } finally {
            setTimeout(() => this.setState(newState), 1000)
        }
    }

    error = (
        <div className="SigninError">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            <p>
                <b>We couldn't find your workspace. </b>
                If you haven't created a workspace and just want to explore, you can&nbsp; 
                <a href="#">try the demo</a>
            </p>
        </div>
    );

    button = (
        <button type="submit" className="SigninButton">
            Continue <span>
            <i className="fa fa-arrow-right" aria-hidden="true"/>
            </span>
        </button>        
    )

    loading = (
        <button className="SigninLoading">
            Loading <span> 
            <i className="fa fa-spinner fa-spin fa-fw"></i>
            <span className="sr-only">Loading...</span>
            </span>
        </button>
    )
    render (){
        return (
            <div className="Signin">
                <WelcomeHeader />
                {this.state.error ? this.error : null }
                <div className="SigninMain">
                    <h1>Sign in to your workspace</h1>
                    <h5>Enter your workspace's <b>Lively URL</b></h5>
                    <form action="post" onSubmit={this.handleSubmit}> 
                        <div>
                            <div>lively.com/</div>
                            <input 
                                placeholder="your-workspace-url" 
                                type="text" 
                                value={this.state.url} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                        </div>
                        {this.state.loading ? this.loading : this.button}
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
`

export default graphql(doesTeamExist)(Signin);
