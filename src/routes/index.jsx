import React from 'react';
import { Switch, Route} from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/login';
import UserPage from '../pages/users';
import { PageNavigation } from '../utils/pageNavigation';

export default () => (  
  <Switch>
    <Route exact path="/bc">
      <PageNavigation/>
    </Route>
    <Route exact path="/auth">
      <LoginPage/>
    </Route>
    <Route exact path="/dashboard">
      <DashboardPage/>
    </Route>
    <Route exact path="/users">
      <UserPage/>
    </Route>
  </Switch>
)