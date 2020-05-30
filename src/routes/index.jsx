import React from 'react';
import { Switch, Route} from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/login';
import UserPage from '../pages/users';
import { UserTransDetails } from '../components/Dashboard/subComponents';

export default () => (  
  <Switch>
    <Route exact path="/bc">
      <UserTransDetails 
        amt="5,000"
        trans_date="21/jan/2020"
        first_name="john"
        last_name="doe"
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
  </Switch>
)