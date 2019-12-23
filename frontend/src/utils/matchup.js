/**
 *
 * 2K Matchup Generator.
 *
 * ######### RULES #########
 *
 * Broken teams get 1 suicide
 * Top teams get 1 random & 1 suicide
 * Mid teams get 2 randoms & 1 suicide
 * Scrubs get 2 randoms & 1 suicide
 *
 */

import { TEAMS } from '../data/teams';
import { getRandomInt } from './util';

const generateMatchup = tierNum => {
  const teamGroup = TEAMS[tierNum];
  const n = teamGroup.length;
  while (true) {
    const i = getRandomInt(n);
    const j = getRandomInt(n);
    if (i !== j) {
      return [teamGroup[i], teamGroup[j]];
    }
  }
};

export default generateMatchup;
