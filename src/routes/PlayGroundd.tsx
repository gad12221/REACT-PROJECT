import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

const PlayGroundd = () => {

  //מילת חיפוש
  const [search, setSearch] = useState("");
  //תוצאות API
  const [results, setResults] = useState([]);
  const api = `https://rickandmortyapi.com/api/character/?name=${search}`;

  useEffect(() => {
    axios.get(api).then((res) => {
      setResults(res.data.results);
    });
  }, [search]);

  return (
    <Stack>
      <TextField
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        variant="filled"
        label="Search"
      />

      <Button variant="contained">Search</Button>

      {results.map((r) => (
        <div key={r.id}>{r.name}</div>
      ))}
    </Stack>
  );
};
export default PlayGroundd