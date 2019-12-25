import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {},
});

const SubmitMatchup = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3">Submit Matchup</Typography>
    </>
  );
};

export default SubmitMatchup;
