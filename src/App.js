import React from 'react';
import Routes from './routes';
import ScrollTop from './utils/scrollTop';
import './App.css';

function App() {
  return (
    <ScrollTop>
      <Routes />
    </ScrollTop>
  );
}

export default App;
