import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Tier from './tier';

const useStyles = makeStyles({
  root: {},
});

const Player = ({ name, team }) => {
  const classes = useStyles();
  const [tier, setTier] = useState(0);
  return (
    <>
      <Typography variant="h5">{name}</Typography>
      <Typography>{team}</Typography>
    </>
  );
};

export default Player;
