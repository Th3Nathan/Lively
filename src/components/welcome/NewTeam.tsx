import * as React from 'react';
import { gql, graphql, QueryProps, MutationFunc } from 'react-apollo';
import { OperationVariables } from 'react-apollo/types';
import { Submit, Loading } from './Buttons';
import { stringToTeamName, validTeamName } from '../../util';
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

interface Response {
    ok: boolean;
    errors: [{message: string}];
    team: {
        name: string;
        url: string;
    };    
}

interface GraphQLProps extends ParentProps {
    data?: QueryProps<OperationVariables> & Partial<{ createTeam: Response}>;
    mutate?: MutationFunc<{ createTeam: Response; }, OperationVariables> | undefined; 
} 

interface State {
    name: string;
    error: string;
    loading: boolean;
}

class NewTeam extends React.Component<GraphQLProps, State> {
    state = {name: '', error: '', loading: false};

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({name: e.currentTarget.value});
    }

    handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validTeamName(this.state.name)) {
            this.setState({error: 'Invalid team name'});
            return;
        }
        this.setState({ loading: true });
        const newState = { error: '', loading: false };
        try {
            const name = this.state.name;
            const response = await this.props.mutate!({ variables: { name }});
            const createdTeam = response.data.createTeam;
            if (!createdTeam.ok) {
                newState.error = createdTeam.errors[0].message;
            }
            setTimeout(
                () => {  
                    this.setState(newState);
                    if (createdTeam.ok) {
                        this.props.history.push(createdTeam.team.url);
                    }
                }, 
                1000
            );
        } catch (err) {
            console.log(err); // tslint:disable-line
        } 
    }

    render() {
        const { error, name } = this.state;
        return (
            <div className="NewTeam">
                <WelcomeHeader />
                <Error visable={!!error}>
                    {error}   
                </Error>
                <div className="NewTeamMain">
                    <h1>Create a new Workspace!</h1>
                    <h5>Workspace address:</h5> 
                    <h5 className="NewTeamMainUrl">
                        <b>liv3ly.herokuapp.com/{stringToTeamName(name)}</b>
                    </h5>
                    <form action="post" onSubmit={this.handleSubmit}> 
                        <div className="NewTeamInputWrap">
                            <input 
                                placeholder="your-workspace-name" 
                                type="text" 
                                value={this.state.name} 
                                onChange={this.handleChange} 
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                        {this.state.loading ? Loading() : Submit('arrow-right', 'Continue')}
                    </form>
                </div>
                <WelcomeFooter />
            </div>
        );
    }
}

// GQL 

const createTeam = gql`
    mutation($name: String!){   
        createTeam(input: {name: $name}) {
            ok
            team {
                name 
                url
            }
            errors {
                message
            }
        }
    }
`;

export default graphql<{createTeam: Response}, ParentProps>(createTeam)(NewTeam);
