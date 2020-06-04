import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';
import BlocksComponent from '../../components/Blocks';

export default () => (
    <div>
      <Helmet>
        <title>Blocks - Bash</title>
      </Helmet>
      <Layout>
        <BlocksComponent/>
      </Layout>
    </div>
)