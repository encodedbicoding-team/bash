import React from 'react';
import { Switch, Route} from 'react-router-dom';
import DashboardPage from '../pages/dashboard';

export default () => (  
  <Switch>
    <Route exact path="/">
      <div>Home</div>
    </Route>
    <Route exact path="/dashboard">
      <DashboardPage/>
    </Route>
  </Switch>
)