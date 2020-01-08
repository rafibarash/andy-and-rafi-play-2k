import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tabs, Tab } from '@material-ui/core';

import GenerateMatchup from './generateMatchup';
import GenerateHome from './generateHome';
import SubmitMatchup from './submitMatchup';
import Matchups from './matchups';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      display: 'flex',
    },
  },
  tabGrid: {
    margin: '0 auto 2rem',
    [theme.breakpoints.up('md')]: {
      margin: 'inherit',
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      borderBottom: 'inherit',
    },
    width: 225,
  },
  tabPanel: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      margin: 'inherit',
      width: '100%',
    },
  },
}));

const TabActions = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Grid container>
      <Grid md={3} item className={classes.tabGrid}>
        <Tabs
          value={value}
          onChange={(e, newVal) => setValue(newVal)}
          indicatorColor="primary"
          textColor="primary"
          orientation="vertical"
          variant="scrollable"
          className={classes.tabs}
        >
          <Tab label="Generate Matchup" />
          <Tab label="Generate Home Team" />
          <Tab label="Submit Matchup" />
          <Tab label="View Past Matchups" />
        </Tabs>
      </Grid>
      <Grid md={9} item className={classes.tabPanel}>
        {value === 0 && <GenerateMatchup />}
        {value === 1 && <GenerateHome />}
        {value === 2 && <SubmitMatchup />}
        {value === 3 && <Matchups />}
      </Grid>
    </Grid>
  );
};

export default TabActions;
