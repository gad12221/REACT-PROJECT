import { Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardType } from '../../@types/types';

const Search = () => {
  const api = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get(api).then((res) => setAllCards(res.data));
  }, []);
  useEffect(() => {
    const f = allCards.filter((c) => c.title.includes(search));
    setFilteredCards(f);
  }, [search]);
  return (
    <Stack>
      <TextField
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
        variant="outlined"
        label="Search"
        required
      />
      {filteredCards.map((c) => (
        <div key={c._id}>{c.title}</div>
      ))}
    </Stack>
  );
};

export default Search;