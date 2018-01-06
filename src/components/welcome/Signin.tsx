import * as React from 'react';
import { gql, graphql, QueryProps, MutationFunc } from 'react-apollo';
import { OperationVariables } from 'react-apollo/types';
import { Submit, Loading } from './Buttons';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import Error from './Error';
import './Signin.css';

interface ParentProps {
    id: string;
    history: {
        push: (url: string) => void;
    };
}

interface GraphQLProps extends ParentProps {
    data?: QueryProps<OperationVariables> & Partial<{ doesTeamExist: boolean}>;
    mutate?: MutationFunc<{ doesTeamExist: boolean; }, OperationVariables> | undefined; 
} 

interface State {
    url: string;
    error: boolean;
    loading: boolean;
}

class Signin extends React.Component<GraphQLProps, State> {
    state = {url: '', error: false, loading: false};

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({url: e.currentTarget.value});
    }

    handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ loading: true });
        const newState = { error: false, loading: false };
        const url = this.state.url;
        try {
            const response = await this.props.mutate!({ variables: { url } });
            const isExistingTeam = response.data.doesTeamExist;
            newState.error = !isExistingTeam;
            setTimeout(
                () => {  
                    this.setState(newState);
                    if (!newState.error) {
                        this.props.history.push(this.state.url);
                    }
                }, 
                1000
            );
        } catch (err) {
            throw 'Server is down';
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
                            <div>liv3ly.herokuapp.com/</div>
                            <input 
                                placeholder="your-workspace-url" 
                                type="text" 
                                value={this.state.url} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                        </div>
                        {this.state.loading ? Loading() : Submit('arrow-right', 'Continue')}
                    </form>
                </div>
                <p>Need to get your group started on Lively? <a href="/signup">Create a new workspace</a></p>
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

export default graphql<{doesTeamExist: boolean}, ParentProps>(doesTeamExist)(Signin);
