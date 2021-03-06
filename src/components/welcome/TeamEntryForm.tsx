import * as React from 'react';
import './TeamEntry.css';
import { handleTokens } from '../../util';
import { Submit, Loading } from './Buttons';
import { validateEmail } from '../../util';
import { MutationFunc } from 'react-apollo';

interface State {
    email: string;
    password: string;
    loading: boolean;
    badEmail: boolean; 
    badPassword: boolean;
    shouldFocus: boolean;
    hasWrittenInEmail: boolean;
}

type MutationPayload = {
    teamLogin: {
        ok: boolean;
        token?: string;
        refreshToken?: string;
    }
};
  
type MutationInput = {
    url: string;
    password: string; 
    email: string
 };
  
interface Props {
    url: string;
    setError: (error: boolean) => void; 
    teamLogin: MutationFunc<MutationPayload, MutationInput>;
}

class TeamEntryForm extends React.Component<Props, State> {
    state = {
        email: '', 
        password: '', 
        loading: false,
        badEmail: false,
        badPassword: false,
        shouldFocus: false,
        hasWrittenInEmail: false,
    };

    badInputStyle = {border: '1px solid #d72b3f', background: '#fbeaec'};

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            [e.currentTarget.name as any]: e.currentTarget.value // tslint:disable-line
        });
    }

    checkBadFields = (submitting = false) => {
        const {email, password} = this.state;
        let badInputFound = false;
        if ((email === '' && password === '') && !submitting) {
            return true;
        } 
        if (email === '' || !validateEmail(email)) {
            this.setState({badEmail: true});
            badInputFound = true;
        } else {
            this.setState({badEmail: false});
        } 
        if (password === '') {
            this.setState({badPassword: true});
            badInputFound = true;           
        } else {
            this.setState({badPassword: false});
        }
        return badInputFound;
    }

    handlePasswordFocus = () => {
        // no red error if they type a correct email then click on password field
        const { email, password, shouldFocus } = this.state;
        if (validateEmail(email) && !shouldFocus) {
            if (password === '') {
                this.setState({badPassword: false});
            }
        }
    }

    focus = (type: string) => {
        let focusFunc = (input: HTMLInputElement) => input && input.focus();
        let noFocus = (input: HTMLInputElement) => null;
        if (!this.state.shouldFocus) { return noFocus; }
        const {badEmail, badPassword} = this.state;
        if (type === 'email') {
            return badEmail ? focusFunc : noFocus;
        } else if (!badEmail) {
           return badPassword ? focusFunc : noFocus;
        } else {
            return noFocus;
        }
    }

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({ shouldFocus: true });
        setTimeout(() => this.setState({ shouldFocus: false }), 0);
        if (this.checkBadFields(true)) { return null; }
        const { email, password } = this.state;
        const newState = { loading: false };
        this.setState({ loading: true });
        let error = false;
        let url = this.props.url;
        try {
            let response = await this.props.teamLogin({ variables: {email, password, url }});
            if (!response.data) { throw 'Lost Connection to server'; } // use redux to throw error page if server down?
            if (response.data.teamLogin.ok) {
                handleTokens({
                    token: response.data.teamLogin.token,
                    refreshToken: response.data.teamLogin.refreshToken,
                });
            } else {
                error = true;
            }
        } catch (err) {
            return err;
        } finally {
            // artificial loading because the button has a spinner
            setTimeout(() => this.setState(newState), 1000);
            this.props.setError(error);
        }
    }

    // this is to disable autocomplete, chrome does not respect autoComplete="off"
    handleFocus = () => this.setState({hasWrittenInEmail: true});

    render() {
        const {badEmail, badPassword, email, password, loading, hasWrittenInEmail} = this.state;
        return (
            <form action="post" autoComplete="disable" onSubmit={this.handleSubmit}> 
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
                        onBlur={() => this.checkBadFields(false)}
                        onFocus={this.handleFocus}
                        readOnly={!hasWrittenInEmail}
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
                        onBlur={() => this.checkBadFields(false)}
                        onFocus={this.handlePasswordFocus}
                    />
                </div>
                {loading ? Loading() : Submit('', 'Sign in')}
            </form>
        );
    }
}

export default TeamEntryForm;