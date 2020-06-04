import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';
import TransactionsComponent from '../../components/Transactions';

function TransactionsPage() {
  return (
    <div>
      <Helmet>
        <title>Transactions - Bash</title>
      </Helmet>
      <Layout>
        <TransactionsComponent />
      </Layout>
    </div>
  )
}

export default TransactionsPage;