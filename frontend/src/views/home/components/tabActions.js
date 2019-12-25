import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';

import GenerateMatchup from './generateMatchup';
import GenerateHomeTeam from './generateHomeTeam';
import SubmitMatchup from './submitMatchup';

const useStyles = makeStyles({
  tabs: {
    flexGrow: 1,
    marginBottom: '2rem',
  },
});

const TabActions = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Paper className={classes.tabs}>
        <Tabs
          value={value}
          onChange={(e, newVal) => setValue(newVal)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Generate Matchup" />
          <Tab label="Generate Home Team" />
          <Tab label="Submit Matchup" />
        </Tabs>
      </Paper>
      {value === 0 && <GenerateMatchup />}
      {value === 1 && <GenerateHomeTeam />}
      {value === 2 && <SubmitMatchup />}
    </>
  );
};

export default TabActions;
