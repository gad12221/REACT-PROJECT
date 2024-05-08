import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { CardType } from "../@types/types";

const PlayGrounddd = () => {
  const api = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(api).then((res) => setAllCards(res.data));
  }, []);

  useEffect(() => {
    const f = allCards.filter((c) => c.title.includes(search))
    setFilteredCards(f)
  }, [search])
  //מילת חיפוש

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

      {
        filteredCards.map((c) => (
          <div key={c._id}>{c.title}</div>
        ))}
    </Stack>
  );
};


const FizzBuzz = () => {
  const [currentNumber, setCurrentNumber] = useState(0);

  const fizzBuzzResults = useMemo(() => {
    const results: string[] = [];
    for (let i = 0; i < 1000; i++) {
      //divisible by 3 "fizz"
      //divisible by 5 "buzz"
      //divisible by 15 "fiz-buzz"
      //not divisible - ""
      if (i % 3 == 0 && i % 5 == 0) {
        results.push("fizz-buzz");
      } else if (i % 3 == 0) {
        results.push("fizz");
      } else if (i % 5 == 0) {
        results.push("buzz");
      } else {
        results.push("");
      }
    }

    return results;
  }, []);

  return (
    <Stack>
      {currentNumber}
      <Button onClick={() => setCurrentNumber((c) => c + 1)}>Next</Button>;
    </Stack>
  );
};


export default PlayGrounddd
