import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, TextField, Button } from '@material-ui/core';
import defaultMatchupStats from '../../../data/matchup';

const useStyles = makeStyles({
  root: {},
  matchups: {
    marginBottom: '1rem',
  },
  matchup: {
    padding: '1rem',
  },
  input: {
    marginBottom: '10px',
  },
});

const MatchupForm = ({ stats, setStats, name }) => {
  const classes = useStyles();

  const handleChange = e => {
    const { id, value } = e.target;
    const key = id.split('-')[1];
    setStats(prevStats => {
      const newStats = { ...prevStats };
      newStats[key] = value;
      return newStats;
    });
  };

  return (
    <Paper className={classes.matchup}>
      <Typography component="h2" variant="h5" gutterBottom>
        {`${name}'s Stats`}
      </Typography>
      {Object.entries(stats).map(([key, val]) => (
        <TextField
          id={`${name}-${key}`}
          label={key}
          variant="outlined"
          placeholder="0"
          value={val}
          error={isNaN(val)}
          key={key}
          onChange={handleChange}
          className={classes.input}
        />
      ))}
    </Paper>
  );
};

const SubmitMatchup = () => {
  const classes = useStyles();
  const [teamOneStats, setTeamOneStats] = useState(defaultMatchupStats);
  const [teamTwoStats, setTeamTwoStats] = useState(defaultMatchupStats);
  const names = ['Andy', 'Rafi'];

  const cleanAndValidate = (stats, name) => {
    const newStats = {};
    let numValidStats = 0;
    for (const [key, val] of Object.entries(stats)) {
      if (isNaN(val)) {
        throw Error('Invalid stats.');
      } else if (val === '') {
        newStats[key] = 0;
      } else {
        newStats[key] = Number(val);
        numValidStats++;
      }
    }
    // if no valid stats, raise error
    if (numValidStats === 0) {
      throw Error('No stats filled out.');
    }
    // add name
    newStats.name = name;
    return newStats;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const matchup = {
      teamOneStats: cleanAndValidate(teamOneStats, names[0]),
      teamTwoStats: cleanAndValidate(teamTwoStats, names[1]),
    };
    const res = await fetch('/.netlify/functions/server/matchup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchup),
    });
    console.log(res);
    const json = await res.json();
    console.log(json);
  };

  return (
    <div className={classes.root}>
      <form>
        <Grid
          container
          spacing={4}
          justify="center"
          className={classes.matchups}
        >
          <Grid sm={6} md={5} item>
            <MatchupForm
              stats={teamOneStats}
              setStats={setTeamOneStats}
              name={names[0]}
            />
          </Grid>
          <Grid sm={6} md={5} item>
            <MatchupForm
              stats={teamTwoStats}
              setStats={setTeamTwoStats}
              name={names[1]}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Matchup
        </Button>
      </form>
    </div>
  );
};

export default SubmitMatchup;
