import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Showcase from './components/showcase';
import Teams from './components/teams';
import Section from '../../components/section';
import TabActions from './components/tabActions';

const useStyles = makeStyles({
  header: {
    marginBottom: '2rem',
  },
});

const Home = () => {
  const classes = useStyles();
  const [tier, setTier] = useState(0);
  return (
    <>
      {/* <Showcase tier={tier} setTier={setTier} />
      <Teams tier={tier} setTier={setTier} /> */}
      <Section>
        <Typography variant="h1" className={classes.header}>
          Homepage
        </Typography>
        <TabActions />
      </Section>
    </>
  );
};

export default Home;
