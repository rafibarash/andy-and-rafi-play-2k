import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import generateMatchup from '../../../utils/matchup';

import Player from './player';
import Tier from './tier';

const useStyles = makeStyles({
  actions: {
    margin: '0 auto',
  },
});

const Actions = ({ tier, setTier, setMatchup }) => {
  const classes = useStyles();
  const handleClick = () => {
    setMatchup(generateMatchup(tier));
  };

  useEffect(() => {
    setMatchup(['', '']);
  }, [tier]);

  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item>
        <Tier tier={tier} setTier={setTier} />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick()}
          className={classes.btn}
        >
          Generate Matchup!
        </Button>
      </Grid>
    </Grid>
  );
};

const Matchup = ({ matchup, names }) => {
  return (
    <Grid container>
      <Grid sm={6} item>
        <Player name={names[0]} team={matchup[0]} />
      </Grid>
      <Grid sm={6} item>
        <Player name={names[1]} team={matchup[1]} />
      </Grid>
    </Grid>
  );
};

const GenerateMatchup = () => {
  const [tier, setTier] = useState(0);
  const [matchup, setMatchup] = useState(['', '']);
  const names = ['Andy', 'Rafi'];

  return (
    <>
      <Actions tier={tier} setTier={setTier} setMatchup={setMatchup} />
      <Matchup names={names} matchup={matchup} />
    </>
  );
};

export default GenerateMatchup;
