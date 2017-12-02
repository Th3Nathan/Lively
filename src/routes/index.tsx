import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';
// import Home from './home';
import Signin from './welcome/Signin'
export default () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/" exact component={Signin} />
        </Switch>
    </BrowserRouter>
);
