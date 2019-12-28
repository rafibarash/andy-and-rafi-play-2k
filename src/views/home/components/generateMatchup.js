import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
} from '@material-ui/core';
import generateMatchup from '../../../utils/matchup';

const useStyles = makeStyles(theme => ({
  actions: {
    marginBottom: '1.5rem',
  },
  btn: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    [theme.breakpoints.down('xs')]: {
      minWidth: 80,
      margin: 0,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  player: {
    padding: '1.5rem',
    minHeight: '150px',
    width: '200px',
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      minHeight: '135px',
    },
  },
  playerName: {
    marginBottom: '1rem',
  },
  noTeam: {
    color: 'gray',
  },
}));

/**
 * Component displaying selection of current tier
 *
 * @param {props} contains tier and setTier
 */
const Tier = ({ tier, setTier }) => {
  const classes = useStyles();
  const TIERS = ['Broken', 'Top', 'Mid', 'Scrubs'];

  const handleChange = e => setTier(e.target.value);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="select-tier-label">
          Tier
        </InputLabel>
        <Select
          labelId="select-tier-label"
          id="select-tier"
          value={tier}
          onChange={handleChange}
          labelWidth={labelWidth}
          className={classes.btn}
        >
          {TIERS.map((tier_name, i) => (
            <MenuItem value={i} key={tier_name}>
              {tier_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

const Player = ({ name, team }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.player}>
      <Typography variant="h5" className={classes.playerName}>
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

const Actions = ({ tier, setTier, setMatchup }) => {
  const classes = useStyles();
  const handleClick = () => {
    setMatchup(generateMatchup(tier));
  };

  useEffect(() => {
    setMatchup(['', '']);
  }, [tier, setMatchup]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.actions}
    >
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
          Generate Matchup
        </Button>
      </Grid>
    </Grid>
  );
};

const Matchup = ({ matchup, names }) => {
  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid sm={6} md={4} item>
        <Player name={names[0]} team={matchup[0]} />
      </Grid>

      <Grid sm={6} md={4} item>
        <Player name={names[1]} team={matchup[1]} />
      </Grid>
    </Grid>
  );
};

const GenerateMatchup = () => {
  const [tier, setTier] = useState(2);
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
