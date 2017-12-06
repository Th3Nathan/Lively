import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
// import Home from './home';
import Signin from './welcome/Signin';
import TeamEntry from './welcome/TeamEntry';
import NewTeam from './NewTeam';
export default () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact={true} component={Signin} />
            <Route path="/createnew" exact={true} component={NewTeam} /> 
            <Route path="/createexisting" exact={true} component={NewTeam} /> 
            <Route path="/:team" exact={true} component={TeamEntry}/>
        </Switch>
    </BrowserRouter>
);
