import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: '1.5rem',
    minHeight: '150px',
  },
  name: {
    marginBottom: '1rem',
  },
  noTeam: {
    color: 'gray',
  },
});

const Player = ({ name, team }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.name}>
        {name}
      </Typography>
      {team ? (
        <Typography variant="h6" color="primary">
          {team}
        </Typography>
      ) : (
        <Typography className={classes.noTeam}>No team selected...</Typography>
      )}
    </Paper>
  );
};

export default Player;
