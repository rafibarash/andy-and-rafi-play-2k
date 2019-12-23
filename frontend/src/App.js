import React, { useState } from 'react';

import Layout from './components/layout';
import Showcase from './components/showcase';
import Teams from './components/teams';

/**
 * Main app component
 */
const App = () => {
  const [tier, setTier] = useState(0);
  return (
    <Layout>
      <Showcase tier={tier} setTier={setTier} />
      <Teams tier={tier} setTier={setTier} />
    </Layout>
  );
};

export default App;
