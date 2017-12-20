import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
// import Home from './home';
import Signin from '../components/welcome/Signin';
import TeamEntry from '../components/welcome/TeamEntry';
import Session from '../components/welcome/Session';
import Home from '../components/App';
export default () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact={true} component={Signin} />
            <Route path="/createnew" exact={true} component={Session} /> 
            <Route path="/createexisting" exact={true} component={Session} /> 
            <Route path="/home" exact={true} component={Home} />
            <Route path="/:team" exact={true} component={TeamEntry}/>
        </Switch>
    </BrowserRouter>
);
