import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
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
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableRoot: {
    minWidth: 300,
    maxWidth: 450,
    margin: '0 auto',
  },
  tableContainer: {
    maxHeight: 500,
  },
}));

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

const MatchupTable = ({ matchups }) => {
  const classes = useStyles();

  const handleClick = id => {
    console.log(id);
  };

  return (
    <Paper className={classes.tableRoot}>
      <TableContainer className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="previous matchups table"
        >
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
                let color1 = null;
                let color2 = null;
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
                      <Button color="primary" onClick={() => handleClick(id)}>
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

const Loading = () => (
  <>
    <Typography>Loading matchups...</Typography>
    <CircularProgress />
  </>
);

const Matchups = () => {
  const [matchups, setMatchups] = useState(null);
  const [matchup, setMatchup] = useState(null);

  useEffect(() => {
    const fetchMatchups = async () => {
      // Load past matchups on mount
      const res = await fetch('/.netlify/functions/server/matchup');
      // Handle Errors
      if (!res.ok) {
        console.error(res);
        throw Error('Unable to connect to database.');
      }
      // set matchups
      const json = await res.json();
      setMatchups(json.matchups);
    };
    fetchMatchups();
  }, []);

  return <>{matchups ? <MatchupTable matchups={matchups} /> : <Loading />}</>;
};

export default Matchups;
