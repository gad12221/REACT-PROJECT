import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../services/cards";
import { CardType } from "../../@types/types";

const LikedCardsPage = () => {
  const [allCards, setAllCards] = useState<CardType[]>([]);

  const handleLike = (cardId: string) => {
    const updatedCards = allCards.map(card => {
      if (card._id === cardId) {
        const updatedCard = { ...card, likes: [...card.likes, 'user_id'] };
        return updatedCard;
      }
      return card;
    });

    setAllCards(updatedCards);

    axios.patch(`${baseUrl} / ${cardId}`, { like: 'user_id' }, {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQyNGFlOWE4ZDFlYWUxMmQzMWUzNjAiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjk4ODQzNDQyfQ.znXbzyxMKeNrKf3dA8jXQ5CFptM8-iXjeFtqx3XfHD0'
      }
    })
      .then((res) => {
        console.log("Response from server:", res);

        const updatedCard = res.data;
        console.log("Updated card:", updatedCard);

        const updatedCards = allCards.map(card => {
          if (card._id === updatedCard._id) {
            return updatedCard;
          }
          return card;
        });
        console.log("Updated cards:", updatedCards);

        setAllCards(updatedCards);

        console.log("Like added successfully. Updated cards:", updatedCards);
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  };

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setAllCards(res.data);
    });
  }, [])
};