import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
// import Home from './home';
import Signin from './welcome/Signin';
import TeamEntry from './welcome/TeamEntry';
export default () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact={true} component={Signin} />
            <Route path="/:team" component={TeamEntry}/>
        </Switch>
    </BrowserRouter>
);
