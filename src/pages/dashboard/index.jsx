import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';

function DashboardPage() {
  return (
    <div>
      <Helmet>
        <title>Dashboard - Bash</title>
      </Helmet>
      <Layout>
        <div>Dashboard</div>
      </Layout>
    </div>
  )
}

export default DashboardPage;