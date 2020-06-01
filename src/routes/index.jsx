import React from 'react';
import { Switch, Route} from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/login';
import UserPage from '../pages/users';
import UserDetailsPage from '../pages/userDetails';
import { DetailsInfo } from '../utils/utils';
import { UserMainDetails, UserDetailsContent } from '../components/User/subComponents';

export default () => (  
  <Switch>
    <Route exact path="/">
      <LoginPage/>
    </Route>
    <Route exact path="/bc">
      <DetailsInfo
        title="visitors"
        figure="59,345"
      />
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
    <Route exact path="/users/d/:id">
      <UserDetailsPage/>
    </Route>
  </Switch>
)