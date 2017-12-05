import * as React from 'react';
import './NewTeam.css';

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
                </div>
            </div>
        );
    }
}

export default NewTeam;


