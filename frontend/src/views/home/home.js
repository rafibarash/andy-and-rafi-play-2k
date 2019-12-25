import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Section from '../../components/section';
import TabActions from './components/tabActions';

const useStyles = makeStyles({
  header: {
    marginBottom: '2rem',
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <Section>
      <Typography variant="h1" className={classes.header}>
        Homepage
      </Typography>
      <TabActions />
    </Section>
  );
};

export default Home;
