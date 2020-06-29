import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../../utils/Layout';
import CategoriesComponent from '../../components/Categories';

function CategoriesPage() {
  return (
    <div>
      <Helmet>
        <title>Categories - Bash</title>
      </Helmet>
      <Layout>
        <CategoriesComponent />
      </Layout>
    </div>
  )
}

export default CategoriesPage;