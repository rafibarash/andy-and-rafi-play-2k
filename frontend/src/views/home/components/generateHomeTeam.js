import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { getRandomInt } from '../../../utils/util';

const useStyles = makeStyles({
  root: {},
  notSelected: {
    color: 'gray',
  },
  btn: {
    marginBottom: '1.5rem',
  },
});

const GenerateHomeTeam = () => {
  const classes = useStyles();
  const [home, setHome] = useState('');
  const names = ['Andy', 'Rafi'];

  const handleClick = () => {
    const n = names.length;
    const name = names[getRandomInt(n)];
    setHome(name);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick()}
        className={classes.btn}
      >
        Generate Home Team
      </Button>
      {home === '' ? (
        <Typography className={classes.notSelected}>
          <i>No home team generated...</i>
        </Typography>
      ) : (
        <>
          {home === 'Andy' ? (
            <Typography>
              Andy is home... too bad he'll lose cause he sucks.
            </Typography>
          ) : (
            <Typography>Rafi is home... good luck!</Typography>
          )}
        </>
      )}
    </div>
  );
};

export default GenerateHomeTeam;
