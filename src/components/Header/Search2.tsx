import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Stack } from '@mui/material';
import { CardType } from '../../@types/types';
import { baseUrl } from '../../services/cards';

const Search2 = ({ allCards, setAllCards }: { allCards: CardType[], setAllCards: React.Dispatch<React.SetStateAction<CardType[]>> }) => {
  const [search, setSearch] = useState("");
  const [txt, setTxt] = useState("");
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${baseUrl}/cards`).then((res) => setAllCards(res.data));
  }, []);
  useEffect(() => {
    const f = allCards.filter((c) => c.title.includes(search));
    setFilteredCards(f);
  }, [search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setTxt(searchValue);
    navigate(`/?filter=${searchValue}`);
  };

  return (
    <Stack>
      <TextField
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={txt}
        onChange={handleInputChange}
      />
      {filteredCards.map((c) => (
        <div key={c._id}>{c.title}</div>
      ))}
    </Stack>
  );
};

export default Search2;