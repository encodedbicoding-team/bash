import React from 'react';
import { Helmet } from 'react-helmet';
import LoginComponent from '../../components/Login';


export default () => (
  <>
    <Helmet>
      <title>Login - Bash Admin</title>
    </Helmet>
    <LoginComponent/>
  </>

)