import React from 'react';

import Layout from './components/layout';
import Home from './views/home/home';

/**
 * Main app component
 */
const App = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default App;
