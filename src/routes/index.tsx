import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
// import Home from './home';
import TeamEntry from './welcome/TeamEntry';
export default () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact={true} component={TeamEntry} />
        </Switch>
    </BrowserRouter>
);
