import React from 'react';
import Layout from '../../utils/Layout';
import { Helmet } from 'react-helmet';
import UserDetailsComponent from '../../components/userDetails';

export default () => (
  <>
    <Helmet>
      <title>User Details - Bash</title>
    </Helmet>
    <Layout>
        <UserDetailsComponent/>
    </Layout>
  </>
)