import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Activate from './containers/Activate';
import Login from './containers/Login';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import NotFound from './components/404NotFound.js';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';
import Analytics from './containers/Analytics';


// --- ANALYTICS REQUEST EXCEPTION CONTROL --- //

var today = new Date();
var currentHour = today.getHours();

const operational = () => (
    <Route exact path='/analytics' component={Analytics} />
);

const non_operational = () => (
    <Route exact path='/analytics' component={NotFound} />
);

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    {currentHour === 0 ? non_operational() : operational()} {/* Condition to control the redirection to analytics page when is out of service */}
                    <Route component={NotFound} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;