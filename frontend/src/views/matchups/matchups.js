import React from 'react';
import { Typography } from '@material-ui/core';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Matchup from './matchup';

const Routes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Typography variant="h1">Matchups</Typography>
        <Typography variant="h5">Please select a matchup.</Typography>
      </Route>
      <Route path={`${path}/:matchupId`}>
        <Matchup />
      </Route>
    </Switch>
  );
};

const Matchups = () => {
  return (
    <>
      <Routes />
    </>
  );
};

export default Matchups;
