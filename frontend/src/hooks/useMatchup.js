const useMatchup = (toggle, tier) => {
  // keep current matchup in state
  const [matchup, setMatchup] = useState(['', '']);

  // api call to fetch random matchup based on tier
  useEffect(
    tier => {
      const teams = generateMatchup(tier);
      setMatchup({ teams: teams });
      console.log(teams);

      const fetchData = async () => {
        try {
          const body = { tier_index: 3 };
          const res = await fetch(`http://localhost:5000/matchup`, {
            method: 'POST',
            body: JSON.stringify(body),
          });
          if (!(200 <= res.status < 300)) {
            throw Error(
              `Couldn't fetch matchup with error code: ${res.status}`
            );
          }
          const json = await res.json();
          console.log(json);
          setMatchup(json.teams);
        } catch (err) {
          console.error(err.message);
        }

        setTeams(res.teams);
      };
      fetchData();
    },
    [toggle]
  );

  return matchup;
};
