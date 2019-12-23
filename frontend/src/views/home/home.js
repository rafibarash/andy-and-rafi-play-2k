import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import Showcase from './components/showcase';
import Teams from './components/teams';

const Home = () => {
  const [tier, setTier] = useState(0);
  return (
    <>
      <Typography variant="h1">Homepage</Typography>
      {/* <Showcase tier={tier} setTier={setTier} />
      <Teams tier={tier} setTier={setTier} /> */}
    </>
  );
};

export default Home;
