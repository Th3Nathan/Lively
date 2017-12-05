import * as React from 'react';
import './NewTeam.css';
// import './Button.css';
const logo = require('../assets/logo.png');

class NewTeam extends React.Component<any, any> {

    setError = (error: boolean) => setTimeout(() => this.setState({error}), 1000);
    // maybe I can pass in a function to the form, onResponse. It will deal with 
    // this is definitly better than what i have now, because responsibility for 
    // how to deal with graphql query should be in the same place as the component making 
    // the queries. 


    render() {
        return (
            <div className="NewTeam">
                <div className="NewTeamHeader">
                    <img src={logo}/>
                    <h2>Lively</h2>
                    <div className="NewTeamMain">
                        <h1>Introduce Yourself!</h1>
                        <p>Please enter your email and display name, how your teammates on Lively will see and refer to you</p>
                        <div>Full Name</div>
                        <input 
                            placeholder="you@example.com" 
                            name="email"
                            type="text" 
                        />
                        <div>Display name</div>
                        <input 
                            placeholder="Display name" 
                            name="username"
                            type="text" 
                        />
                        <button className="Button">
                            Continue to Password <span> 
                            <i className="fa fa-arrow-right"/>
                            <span className="sr-only">Loading...</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewTeam;


