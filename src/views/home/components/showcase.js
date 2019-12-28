import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Grid } from '@material-ui/core';

import Matchup from '../../../components/matchup';
import Teams from './teams';

const useStyles = makeStyles({
  root: {
    minHeight: '400px',
    padding: '3rem',
    background: '#e3f2fd',
    textAlign: 'center',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    paddingBottom: '1rem',
  },
});

const Header = ({ classes }) => (
  <Typography variant="h2" component="h1" className={classes.header}>
    Andy and Rafi Play 2K
  </Typography>
);

/**
 * React component displaying the current matchup
 *
 * @param {tier} index to represent whether the current tier is broken, top, middle, or scrub
 */
const Showcase = ({ tier, setTier }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Header classes={classes} />
        <Grid container spacing={12}>
          <Grid item sm={6}>
            <Matchup tier={tier} />
          </Grid>
          <Grid item sm={6}>
            <Teams tier={tier} setTier={setTier} />
          </Grid>
        </Grid>
        <Matchup tier={tier} />
      </Box>
    </Box>
  );
};

export default Showcase;
