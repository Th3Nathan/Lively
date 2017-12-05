import * as React from 'react';
import './TeamEntry.css';
import WelcomeFooter from './WelcomeFooter';
import WelcomeHeader from './WelcomeHeader';
import Glitch from './Glitch';
import { gql, graphql } from 'react-apollo';
import {Submit, Loading} from './Buttons';
import Error from './Error';
import { validateEmail } from '../../util';

class TeamEntry extends React.Component<any, {}> {
    state = {
        email: '', 
        password: '', 
        error: false, 
        loading: false,
        badEmail: false,
        badPassword: false,
    };
    badInputStyle = {border: '1px solid #d72b3f', background: '#fbeaec'}
    handleChange = (e: React.SyntheticEvent<any>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value as HTMLInputElement
        });
    }

    checkBadFields = () => {
        const {email, password} = this.state;
        let badInputFound = false;
        if (email === "" || !validateEmail(email)) {
            this.setState({badEmail: true});
            badInputFound = true;
        } else {
            this.setState({badEmail: false})
        } 
        if (password === "") {
            this.setState({badPassword: true});
            badInputFound = true;           
        } else {
            this.setState({badPassword: false})
        }
        return badInputFound;
    }

    focus = (type: string) => {
        let focusFunc = (input: any) => input && input.focus();
        let noFocus = (input: any) => null;
        const {badEmail, badPassword} = this.state;
        if (type === 'email') {
            return badEmail ? focusFunc : noFocus;
        } else if (!badEmail) {
           return badPassword ? focusFunc : noFocus;
        } else {
            return noFocus;
        }
    }

    handleSubmit = async (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        if (this.checkBadFields()) return null;
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
        if (this.props.data.loading === true) return null;
        if (this.props.data.teamFromUrl.ok === false) return <Glitch />;
        const {badEmail, badPassword, error, email, password, loading} = this.state;
        return this.props.data.loading ? null : (
            <div className="TeamEntry">
                <WelcomeHeader />
                <Error visable={error}>
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
                                style={badEmail ? this.badInputStyle : {}}
                                placeholder="you@example.com" 
                                ref={this.focus('email')}
                                name="email"
                                type="text" 
                                value={email} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                            <input 
                                style={badPassword ? this.badInputStyle : {}}
                                placeholder="password"
                                ref={this.focus('password')}
                                name="password" 
                                type="password" 
                                value={password} 
                                onChange={this.handleChange} 
                                spellCheck={false}
                            />
                        </div>
                        {loading ? Loading() : Submit(false,"Sign in")}
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
    query teamFromUrl($url: String!) {
        teamFromUrl(input:{url: $url}) {
            name
            url
            ok
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
)(TeamEntry);
