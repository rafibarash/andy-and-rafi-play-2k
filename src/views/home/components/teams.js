import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import Tier from './tier';
import { TEAMS } from '../../../data/teams';

/**
 * Teams component to display all teams in a tier
 *
 * @param {props} contains tier and setTier
 */
const Teams = ({ tier, setTier }) => {
  return (
    <Box>
      <Typography variant="h5" component="h3">
        Teams
      </Typography>
      <ul>
        {TEAMS[tier].map(team => (
          <li key={team}>{team}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Teams;
