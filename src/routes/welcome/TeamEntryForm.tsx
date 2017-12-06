import * as React from 'react';
import './TeamEntry.css';
import {Submit, Loading} from './Buttons';
import { validateEmail } from '../../util';

class TeamEntryForm extends React.Component<any, any> {
    state = {
        email: '', 
        password: '', 
        loading: false,
        badEmail: false,
        badPassword: false,
        shouldFocus: false,
    };

    badInputStyle = {border: '1px solid #d72b3f', background: '#fbeaec'}

    handleChange = (e: React.SyntheticEvent<any>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value as HTMLInputElement
        });
    }

    checkBadFields = (submitting = false) => {
        const {email, password} = this.state;
        let badInputFound = false;
        if ((email === '' && password == '') && !submitting){
            return true;
        } 
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

    handlePasswordFocus = () => {
        // no red error if they type a correct email then click on password field
        const { email, password, shouldFocus } = this.state;
        if (validateEmail(email) && !shouldFocus){
            if (password == '') {
                this.setState({badPassword: false});
            }
        }
    }

    focus = (type: string) => {
        let focusFunc = (input: any) => input && input.focus();
        let noFocus = (input: any) => null;
        if (!this.state.shouldFocus) return noFocus;
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
        this.setState({shouldFocus: true});
        setTimeout(() => this.setState({shouldFocus: false}),0);
        if (this.checkBadFields(true)) return null;
        const { email, password } = this.state;
        const newState = { loading: false };
        this.setState({ loading: true });
        let error = false;
        let url = this.props.url;
        try {
            let response = await this.props.teamLogin({ variables: {email, password, url }});
            if (response.data.teamLogin.ok) {
                // WIN 
                console.log(response.data.teamLogin);
            } else {
                error = true;
            }
        } catch (err) {
            console.log(err);
            return err;
        } finally {
            //artificial loading because the button has a spinner
            setTimeout(() => this.setState(newState), 1000);
            this.props.setError(error);
        }
    }

    render() {
        const {badEmail, badPassword, email, password, loading} = this.state;
        return (
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
                        onBlur={() => this.checkBadFields(false)}
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
                {loading ? Loading() : Submit(false,"Sign in")}
            </form>

        );
    }
}

export default TeamEntryForm;