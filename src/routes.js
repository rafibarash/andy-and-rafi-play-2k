import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './views/home/home';
import Matchups from './views/matchups/matchups';
import NoMatch from './views/noMatch/noMatch';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/matchups">
      <Matchups />
    </Route>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
);

export default Routes;
