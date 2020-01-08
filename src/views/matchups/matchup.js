import React from 'react';
import { Typography } from '@material-ui/core';

const Matchup = () => {
  const matchupId = 1;
  return (
    <>
      <Typography variant="h1">
        Matchup:
        {matchupId}
      </Typography>
    </>
  );
};

export default Matchup;
