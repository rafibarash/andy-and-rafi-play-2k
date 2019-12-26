import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Section from '../../components/section';
import TabActions from './components/tabActions';

const useStyles = makeStyles(theme => ({
  header: {
    marginBottom: '1.5rem',
    [theme.breakpoints.up('md')]: {
      marginBottom: '3rem',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Section>
      <Typography variant="h2" component="h1" className={classes.header}>
        Andy & Rafi Play 2k
      </Typography>
      <TabActions />
    </Section>
  );
};

export default Home;
