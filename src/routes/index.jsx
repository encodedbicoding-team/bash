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
import ProtectedRoute from '../protected';

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
    <ProtectedRoute exact path="/dashboard" component={DashboardPage}/>
    <ProtectedRoute exact path="/users" component={UserPage}/>
    <ProtectedRoute exact path="/users/d/:id" component={UserDetailsPage}/>
    <ProtectedRoute exact path="/blocks" component={BlocksPage}/>
    <ProtectedRoute exact path="/categories" component={CategoriesPage}/>
    <ProtectedRoute exact path="/transactions" component={TransactionsPage}/>
    <ProtectedRoute exact path="/settings" component={SettingsPage}/>
    <Route path="*">
      <CategoryModal/>
    </Route>
  </Switch>
)