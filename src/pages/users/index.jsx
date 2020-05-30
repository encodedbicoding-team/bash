import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';
import UserComponent from '../../components/User';

function UserPage() {
  return (
    <div>
      <Helmet>
        <title>Users - Bash</title>
      </Helmet>
      <Layout>
        <UserComponent/>
      </Layout>
    </div>
  )
}

export default UserPage;