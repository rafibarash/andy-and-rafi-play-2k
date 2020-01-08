import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

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

// const MatchupTable = () => (
//   <TableContainer component={Paper}>
//     <Table className={classes.table} aria-label="simple table">
//       <TableHead>
//         <TableRow>
//           <TableCell>Dessert (100g serving)</TableCell>
//           <TableCell align="right">Calories</TableCell>
//           <TableCell align="right">Fat&nbsp;(g)</TableCell>
//           <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//           <TableCell align="right">Protein&nbsp;(g)</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {rows.map(row => (
//           <TableRow key={row.name}>
//             <TableCell component="th" scope="row">
//               {row.name}
//             </TableCell>
//             <TableCell align="right">{row.calories}</TableCell>
//             <TableCell align="right">{row.fat}</TableCell>
//             <TableCell align="right">{row.carbs}</TableCell>
//             <TableCell align="right">{row.protein}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

const Matchups = () => {
  const [matchups, setMatchups] = useState(null);
  const [matchup, setMatchup] = useState(null);

  return (
    <>
      <Typography>Select a matchup...</Typography>
      {/* <MatchupTable /> */}
    </>
  );
};

export default Matchups;
