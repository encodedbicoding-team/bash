import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';
import DashboardComponent from '../../components/Dashboard';

function DashboardPage() {
  return (
    <div>
      <Helmet>
        <title>Dashboard - Bash</title>
      </Helmet>
      <Layout>
        <DashboardComponent />
      </Layout>
    </div>
  )
}

export default DashboardPage;