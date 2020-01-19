import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red, green, grey } from '@material-ui/core/colors';
import { ArrowBack } from '@material-ui/icons';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    minWidth: 300,
    maxWidth: 450,
    margin: '0 auto',
  },
  matchupBtn: {
    '&:hover': {
      background: 'inherit',
      textDecoration: 'underline',
    },
  },
  goBackBtn: {
    marginBottom: '1.5rem',
  },
  matchupHeader: {
    marginBottom: '1.5rem',
  },
  matchups: {
    marginBottom: '1rem',
  },
  matchup: {
    padding: '1rem',
  },
  input: {
    marginBottom: '10px',
  },
}));

const MatchupTable = ({ matchups, setMatchupID }) => {
  const classes = useStyles();

  const handleClick = id => {
    setMatchupID(id);
  };

  return (
    <Paper className={classes.tableRoot}>
      <TableContainer>
        <Table aria-label="previous matchups table">
          <TableHead>
            <TableRow>
              <TableCell>ID #</TableCell>
              <TableCell align="right">Andy</TableCell>
              <TableCell align="right">Rafi</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matchups.map(
              ({ id, date, winner, teamOneStats, teamTwoStats }) => {
                // determine if color is green (winner) or red (loser)
                let color1 = grey[400];
                let color2 = grey[400];
                if (winner === teamOneStats.name) {
                  color1 = green[500];
                  color2 = red[500];
                } else if (winner === teamTwoStats.name) {
                  color2 = green[500];
                  color1 = red[500];
                }
                return (
                  <TableRow key={id}>
                    <TableCell component="th">
                      <Button
                        color="primary"
                        className={classes.matchupBtn}
                        // variant="outlined"
                        disableRipple
                        onClick={() => handleClick(id)}
                      >
                        {id}
                      </Button>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ backgroundColor: color1 }}
                    >
                      {teamOneStats.points}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ backgroundColor: color2 }}
                    >
                      {teamTwoStats.points}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(date).toDateString()}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const Loading = ({ msg }) => (
  <>
    <Typography>{msg}</Typography>
    <CircularProgress />
  </>
);

const MatchupForm = ({ stats, otherStats, name }) => {
  const classes = useStyles();

  const myStatColored = key => {
    const myVal = stats[key];
    const otherVal = otherStats[key];
    if (myVal > otherVal) return green[500];
    else if (otherVal > myVal) return red[500];
    else return grey[400];
  };

  // const handleChange = e => {
  //   const { id, value } = e.target;
  //   const key = id.split('-')[1];
  //   setStats(prevStats => {
  //     const newStats = { ...prevStats };
  //     newStats[key] = value;
  //     return newStats;
  //   });
  // };

  return (
    <Paper className={classes.matchup}>
      <Typography component="h2" variant="h5" gutterBottom>
        {`${name}'s Stats`}
      </Typography>
      {Object.entries(stats).map(([key, val]) => (
        <div key={key}>
          {key !== '_id' && key !== 'name' && (
            <TextField
              id={`${name}-${key}`}
              label={key}
              variant="outlined"
              // placeholder="0"
              value={val}
              // error={isNaN(val)}
              // key={key}
              // onChange={handleChange}
              style={{ backgroundColor: myStatColored(key) }}
              className={classes.input}
            />
          )}
        </div>
      ))}
    </Paper>
  );
};

const Matchup = ({ matchupID: id, setMatchupID }) => {
  const classes = useStyles();
  const [matchup, setMatchup] = useState(null);

  // Set the header message
  let winner = '';
  if (matchup) {
    const { teamOneStats: s1, teamTwoStats: s2 } = matchup;
    if (s1.points > s2.points) winner = s1.name;
    else if (s2.points > s1.points) winner = s2.name;
  }

  let headerMsg = `Matchup #${id}, Winner ${winner}`;
  if (!winner) headerMsg = `Matchup #${id}, Tie Game`;

  useEffect(() => {
    const fetchMatchup = async () => {
      try {
        // Fetch matchup
        const res = await fetch(`/.netlify/functions/server/matchup/${id}`);
        // Handle Errors
        if (!res.ok) {
          console.error(res);
          throw Error('Unable to retrieve matchup info.');
        }
        // set matchup
        const json = await res.json();
        console.log(json);
        setMatchup(json);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchMatchup();
  }, [id]);

  const handleClick = () => {
    setMatchupID(null);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.goBackBtn}
        endIcon={<ArrowBack />}
        onClick={handleClick}
      >
        Go Back
      </Button>
      {matchup ? (
        <>
          <Typography variant="h4" className={classes.matchupHeader}>
            {headerMsg}
          </Typography>
          <Grid
            container
            spacing={4}
            justify="center"
            className={classes.matchups}
          >
            <Grid sm={6} md={5} item>
              <MatchupForm
                stats={matchup.teamOneStats}
                otherStats={matchup.teamTwoStats}
                name={matchup.teamOneStats.name}
              />
            </Grid>
            <Grid sm={6} md={5} item>
              <MatchupForm
                stats={matchup.teamTwoStats}
                otherStats={matchup.teamOneStats}
                name={matchup.teamTwoStats.name}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Loading msg="Loading matchup..." />
      )}
    </>
  );
};

const Matchups = () => {
  const [matchups, setMatchups] = useState(null);
  const [matchupID, setMatchupID] = useState(null);

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        // Load past matchups on mount
        const res = await fetch('/.netlify/functions/server/matchup');
        // Handle Errors
        if (!res.ok) {
          console.error(res);
          throw Error('Unable to retrieve matchups.');
        }
        // set matchups
        const json = await res.json();
        setMatchups(json.matchups);
      } catch (err) {
        console.error(err.message);
        setMatchups([]);
      }
    };
    fetchMatchups();
  }, []);

  return (
    <>
      {matchups ? (
        <>
          {matchupID ? (
            <Matchup matchupID={matchupID} setMatchupID={setMatchupID} />
          ) : (
            <>
              {matchups.length === 0 ? (
                <Typography>No matchup data found.</Typography>
              ) : (
                <MatchupTable matchups={matchups} setMatchupID={setMatchupID} />
              )}
            </>
          )}
        </>
      ) : (
        <Loading msg="Loading matchups..." />
      )}
    </>
  );
};

export default Matchups;
