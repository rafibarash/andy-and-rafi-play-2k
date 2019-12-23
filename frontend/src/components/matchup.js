import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box } from '@material-ui/core';
import generateMatchup from '../utils/matchup';

const useStyles = makeStyles({
  root: {
    padding: '2rem',
  },
  title: {
    paddingBottom: '1rem',
  },
  teams: {
    paddingBottom: '1rem',
    margin: '0.5rem 0',
  },
  team: {
    textDecoration: 'underline',
  },
  btn: {},
});

/**
 * React component displaying the current matchup
 *
 * @param {tier} index to represent whether the current tier is broken, top, middle, or scrub
 */
const Matchup = ({ tier }) => {
  const classes = useStyles();
  const [matchup, setMatchup] = useState(['', '']);
  const [team1, team2] = matchup;

  const handleClick = () => {
    setMatchup(generateMatchup(tier));
  };

  useEffect(() => {
    setMatchup(['', '']);
  }, [tier]);

  return (
    <Box className={classes.root}>
      <Typography variant="h4" component="h3" className={classes.title}>
        Current Matchup
      </Typography>
      <Typography variant="h6" component="p" className={classes.teams}>
        {team1 && team2 ? (
          <>
            <span className={classes.team}>{team1}</span> vs{' '}
            <span className={classes.team}>{team2}</span>
          </>
        ) : (
          <Typography>
            <i>No matchup selected...</i>
          </Typography>
        )}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick()}
        className={classes.btn}
      >
        Generate Matchup!
      </Button>
    </Box>
  );
};

export default Matchup;
