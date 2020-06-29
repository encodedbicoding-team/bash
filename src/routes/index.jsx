import React from 'react';
import { Switch, Route} from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/login';
import UserPage from '../pages/users';
import UserDetailsPage from '../pages/userDetails';
import BlocksPage from '../pages/blocks';
import CategoriesPage from '../pages/categories';
import TransactionsPage from '../pages/transactions';
import SettingsPage from '../pages/settings';
import CategoryModal from '../components/Modals/Blocks';

export default () => (  
  <Switch>
    <Route exact path="/">
      <LoginPage/>
    </Route>
    <Route exact path="/bc">
      <CategoryModal/>
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
    <Route exact path="/blocks">
      <BlocksPage/>
    </Route>
    <Route exact path="/categories">
      <CategoriesPage/>
    </Route>
    <Route exact path="/transactions">
      <TransactionsPage/>
    </Route>
    <Route exact path="/settings">
      <SettingsPage/>
    </Route>
  </Switch>
)