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
import { DetailsInfo, BlockCateDetails, PieGraph, LineGraph } from '../utils/utils';
import { UserMainDetails, UserDetailsContent } from '../components/User/subComponents';

export default () => (  
  <Switch>
    <Route exact path="/">
      <LoginPage/>
    </Route>
    <Route exact path="/bc">
      <BlockCateDetails
        title="interantional polititcs"
        keyName="questions"
        value="400"
        showImg={false}
        active={false}
        id={1}
      />
      <PieGraph
        series={[43, 55, 41]}
        // width="380"
      />
      <LineGraph 
        series={[{
          data: [23, 34, 12, 54, 32]
        }]}
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