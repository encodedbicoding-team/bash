import React from 'react';
import { Route, useHistory } from 'react-router-dom';

function ProtectedRoute({component, path }) {
  const history = useHistory()
  let isAuthenticated = sessionStorage.get('__bash__admin__<3_EBC');
  if (!isAuthenticated) {
    return history.push('/login')
  } else {
    return (
      <Route exact path={path} component={component} />
    )
  }
}

export default ProtectedRoute;