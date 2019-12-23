import React, { useState, useEffect } from 'react';

const useTeams = tier => {
  // keep track of teams
  const [teams, setTeams] = useState([]);

  // Fetch teams from api on tier change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/teams/${tier}`);
        if (!(200 <= res.status < 300)) {
          throw Error(`Couldn't fetch teams with error code: ${res.status}`);
        }
        const json = await res.json();
        setTeams(json.teams);
      } catch (err) {
        console.error(err.message);
      }
      setTeams(res.teams);
    };
    fetchData();
  }, [tier]);

  return teams;
};
