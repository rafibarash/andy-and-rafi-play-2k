import React from 'react';
import { Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const Matchup = () => {
  let { matchupId } = useParams();
  return (
    <>
      <Typography variant="h1">Matchup: {matchupId}</Typography>
    </>
  );
};

export default Matchup;
