import React from 'react';
import { Switch, Route} from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/login';
import UserPage from '../pages/users';
import { PageNavigation, DetailsGraph } from '../utils/pageNavigation';
import { UserMainDetails, UserDetailsContent } from '../components/User/subComponents';

export default () => (  
  <Switch>
    <Route exact path="/">
      <LoginPage/>
    </Route>
    <Route exact path="/bc">
      <UserMainDetails/>
      <UserDetailsContent
        id={1}
        phone="09039430430943"
        email="test@email.com"
        username="tester"
        status="verified"
        fullname="John Doe"
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