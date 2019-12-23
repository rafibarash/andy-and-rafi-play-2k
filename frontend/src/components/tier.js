import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TEAMS } from '../data/teams';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 * Component displaying selection of current tier
 *
 * @param {props} contains tier and setTier
 */
const Tier = ({ tier, setTier }) => {
  const classes = useStyles();
  const [teams, setTeams] = useState(TEAMS[tier]);
  const TIERS = ['Broken', 'Top', 'Mid', 'Scrubs'];

  const handleChange = e => {
    const tier = e.target.value;
    setTier(tier);
    setTeams(TEAMS[tier]);
  };

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

export default Tier;
