import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import defaultMatchupStats from '../../../data/matchup';

const useStyles = makeStyles(theme => ({
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
  success: {
    backgroundColor: theme.palette.success[500],
  },
  error: {
    backgroundColor: theme.palette.error[500],
  },
}));

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
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const names = ['Andy', 'Rafi'];

  const displaySnackbar = msg => {
    setSnackMessage(msg);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      throw Error('Each matchup must contain 1+ stats.');
    }
    // add name
    newStats.name = name;
    return newStats;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
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
      if (!res.ok) {
        throw Error('Trouble connecting to database.');
      }
      displaySnackbar('');
    } catch (err) {
      console.error(err.message);
      displaySnackbar(err.message);
    }
    setLoading(false);
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
      {isLoading && (
          <CircularProgress />
      )}

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={snackMessage ? classes.error : classes.success}
          message={snackMessage || 'Matchup successfully entered!'}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};

export default SubmitMatchup;
