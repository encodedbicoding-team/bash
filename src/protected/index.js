import React from 'react';
import { Route, useHistory } from 'react-router-dom';

function ProtectedRoute({component, path}) {
  const history = useHistory()
  let isAuthenticated = sessionStorage.getItem('__bash__admin__<3_EBC');
  if (!isAuthenticated) {
    return history.push('/auth')
  }
  return <Route exact path={path} component={component} />
}

export default ProtectedRoute;