import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';
import SettingsComponent from '../../components/Settings';

function SettingsPage() {
  return (
    <div>
      <Helmet>
        <title>Settings - Bash</title>
      </Helmet>
      <Layout>
        <SettingsComponent />
      </Layout>
    </div>
  )
}

export default SettingsPage;