import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LoginRegisterForm from './components/loginRegister';
import Main from './Main';
import User from './User';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.loggedIn === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location }}} />
    )} />
);

const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        rest.loggedIn === false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: (typeof props.location.state !== typeof undefined) ? props.location.state.pathname : '/app'
            }} />
    }} />
);

const NotFound = () => {
    return (
        <Redirect to='/' />
    );
}

export const routing = ({ changeLoginState, loggedIn }) => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute
                    path='/app'
                    component={() => <Main changeLoginState={changeLoginState} />}
                    loggedIn={loggedIn}
                />

                <LoginRoute
                    exact
                    path='/'
                    component={() => <LoginRegisterForm changeLoginState={changeLoginState}
                    loggedIn={loggedIn} />}
                />

                <PrivateRoute
                    path='/user/:username'
                    component={props => <User {...props} changeLoginState={changeLoginState} />}
                    loggedIn={loggedIn}
                />

                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default routing;
