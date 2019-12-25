import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minHeight: '400px',
    padding: '3rem',
    background: '#e3f2fd',
    textAlign: 'center',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
});

const Section = ({ children }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Box className={classes.content}>{children}</Box>
    </Container>
  );
};

export default Section;
