import axios from "axios";
import { useEffect, useState } from "react";
import { CardType } from "../@types/types";
import defaultImage from "../assets/user-regular-new.png";
import { baseUrl } from "../services/cards";

const LikedCards = () => {
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [likedCards, setLikedCards] = useState<string[]>([]);

  useEffect(() => {

    const savedLikedCards = localStorage.getItem("likedCards");
    if (savedLikedCards) {
      setLikedCards(JSON.parse(savedLikedCards));
    }

    axios.get(baseUrl)
      .then((res) => {
        setAllCards(res.data);
      });
  }, []);

  const handleLike = (cardId: string) => {
    const updatedCards = allCards.map(card => {
      if (card._id === cardId) {
        const updatedCard = { ...card, likes: [...card.likes, 'user_id'] };
        return updatedCard;
      }
      return card;
    });

    setAllCards(updatedCards);

    axios.patch(`${baseUrl}/${cardId}`, { like: 'user_id' }, {
      headers: {
        'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQyNGFlOWE4ZDFlYWUxMmQzMWUzNjAiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjk4ODQzNDQyfQ.znXbzyxMKeNrKf3dA8jXQ5CFptM8-iXjeFtqx3XfHD0'
      }
    })
      .then((res) => {

        const updatedCard = res.data;
        const updatedCards = allCards.map(card => {
          if (card._id === updatedCard._id) {
            return updatedCard;
          }
          console.log("Like added successfully:", res.data);
          return card;
        });
        setAllCards(updatedCards);

        const updatedLikedCards = [...likedCards, cardId];
        setLikedCards(updatedLikedCards);
        /*  localStorage.setItem("likedCards", JSON.stringify(updatedLikedCards)); */
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 mt-2 dark:text-white">
      {allCards.map((c) => (
        <div key={c._id} className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-gray-200 m-2 dark:bg-slate-500">
          <h2>{c.title}</h2>
          <span>Likes: {c.likes.length}</span>
          <button
            onClick={() => handleLike(c._id)}
            style={{
              backgroundColor: likedCards.includes(c._id) ? 'green' : 'blue',
              color: 'white',
              pointerEvents: likedCards.includes(c._id) ? 'none' : 'auto',
              opacity: likedCards.includes(c._id) ? 0.5 : 1,
            }}
          >
            {likedCards.includes(c._id) ? 'Liked' : 'Like'}
          </button>
          <img
            src={c.image ? c.image.url : defaultImage}
            alt={c.image ? c.image.alt : "No image available"}
            className="w-72 h-48 object-cover mt-3"
            onError={(e: any) => {
              e.target.onError = null;
              e.target.src = defaultImage;
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LikedCards;