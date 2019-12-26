import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
});

const GenerateHomeTeam = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">Generate Home Team</Typography>
    </div>
  );
};

export default GenerateHomeTeam;
