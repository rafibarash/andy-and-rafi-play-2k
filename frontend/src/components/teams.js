import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import Tier from './tier';
import { TEAMS } from '../data/teams';

/**
 * Teams component to display all teams in a tier
 *
 * @param {props} contains tier and setTier
 */
const Teams = ({ tier, setTier }) => {
  const [teams, setTeams] = useState(TEAMS[tier]);
  const TIERS = ['Broken', 'Top', 'Mid', 'Scrubs'];

  const handleTierChange = e => {
    const tier = e.target.value;
    setTier(tier);
    setTeams(TEAMS[tier]);
  };

  return (
    <Box>
      <Tier tier={tier} setTier={setTier} />
      <Typography variant="h5" component="h3">
        Teams
      </Typography>
      <ul>
        {teams.map(team => (
          <li key={team}>{team}</li>
        ))}
      </ul>
    </Box>
  );
};

export default Teams;
