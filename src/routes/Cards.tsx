import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../components/Spinners/Spinner";
import defaultImage from "../assets/user-regular-new.png";
import { useCards } from "../hooks/useCards";
import { FaPencilAlt, FaRegStar, FaStar } from "react-icons/fa";
import { deleteCard, getCards, likedCard, unLikedCard } from "../services/cards";
import { CardType } from "../@types/types";
import { showErrorDialog } from "../UI/dialogs";
import { AuthContext } from "../contexts/AuthContext";
import { FaRegTrashCan } from "react-icons/fa6";

const Cards = () => {
  const { cards, loading, error, setCards } = useCards();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [likedCards, setLikedCards] = useState<string[]>([]);
  const { isLoggedIn, isBusiness, isAdmin } = useContext(AuthContext)
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const Navigate = useNavigate();

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((fav) => fav !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const toggleLike = (data: CardType, cardId: string) => {
    console.log("pressed");
    // Check if the card is already liked by the user
    const alreadyLiked = likedCards.includes(cardId);

    // If the card is already liked, remove the like
    if (alreadyLiked) {
      // Remove the cardId from likedCards array
      const updatedLikedCards = likedCards.filter(id => id !== cardId);
      setLikedCards(updatedLikedCards);

      // Send request to API to remove like from the card
      unLikedCard(data, cardId)
        .then((res) => {
          // Handle success response from the server
          console.log("Unlike successful:", res.data);
        })
        .catch((error) => {
          // Handle error response from the server
          console.error("Error removing like:", error);
        });
    } else {
      // If the card is not liked, like the card
      // Update local state to reflect the like action
      const updatedCards = cards.map(card => {
        if (card._id === cardId) {
          // Add the user_id to the likes array of the card
          return { ...card, likes: [...card.likes, 'user_id'] };
        }
        return card;
      });
      setCards(updatedCards);

      // Send request to API to like the card
      likedCard(data, cardId)
        .then((res) => {
          // Handle success response from the server
          const updatedCard = res.data;
          const updatedCards = cards.map(card => {
            if (card._id === updatedCard._id) {
              return updatedCard;
            }
            return card;
          });
          setCards(updatedCards);
          const updatedLikedCards = [...likedCards, cardId];
          setLikedCards(updatedLikedCards);
          console.log("Like added successfully:", res.data);
        })
        .catch((error) => {
          // Handle error response from the server
          console.error("Error adding like:", error);
        });
    }
  };

  const deleteCardHandler = (id: string) => {
    deleteCard(id)
      .then((res) => {
        console.log(res)
        showErrorDialog("Delete", "Card deleted");
        getCards()
          .then((res) => setCards(res.data))
      })
      .catch((err) => console.log(err))
  }

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );




  return (
    <div className="flex flex-col dark:bg-gray-800">
      <input
        type="text"
        placeholder="Search cards..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 my-2 border rounded-md  "
      />
      <div className="flex flex-wrap justify-center items-center gap-5 mt-2 dark:text-white">
        {loading && <Spinners />}
        {error && <div>{error}</div>}
        {filteredCards.map((c) => (
          <div key={c._id} className="flex flex-col justify-center items-center p-7 rounded-md text-center bg-gray-400 m-0.1 dark:bg-slate-700 relative drop-shadow-md">
            <Link to={`/cards/${c._id}`} className="flex flex-col items-center ">
              <img
                src={c.image ? c.image.url : defaultImage}
                alt={c.image ? c.image.alt : "No image available"}
                className="w-72 h-48 object-cover mt-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = defaultImage;
                }}
              />
              <div className="mt-1">
                <h2 style={{ color: "#ff7e66" }} className="text-l ">{c.title}</h2>
                <p className="mb-1 text-sm">{c.subtitle}</p>
                <p className=" text-sm mb-6">{c.phone}</p>
              </div>
            </Link>

            <div className={`flex flex-row items-baseline justify-center w-full`}>
              {isLoggedIn && <button
                className={`flex items-center text-lg mr-2 p-1 rounded-md bg-gray-300 dark:bg-gray-700 ${favorites.includes(c._id) ? 'text-orange-400 dark:text-orange-200' : 'text-gray-500 dark:text-gray-300'} ${favorites.includes(c._id) ? 'text-orange-400 dark:text-orange-200' : 'text-gray-500 dark:text-gray-300'}`}
                onClick={() => toggleFavorite(c._id)}
              >
                {favorites.includes(c._id) ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
              </button>}

              {/*should be here the delete Button*/}

              {isLoggedIn && isBusiness && isAdmin && <div className="absolute top-2 right-2">
                <button className="flex items-center mr-2 p-1 rounded-md text-lg bg-gray-300 dark:bg-gray-700" onClick={() => deleteCardHandler(c._id)}>
                  <FaRegTrashCan className="text-red-600" />


                </button>

              </div>}

              {/* Likes Button */}


              {/*  <div className={`absolute bottom-2 left-2  mr-2 p-1 px-4  rounded-md text-sm bg-gray-300 dark:bg-gray-400 ${likedCards.includes(c._id) ? 'text-orange-400 dark:text-orange-200' : 'text-gray-500 dark:text-gray-300'}`}>
                <div className=" flex justify-between gap-4">
                  <span>Likes: {c.likes.length}</span>
                  {isLoggedIn && <button
                    onClick={() => toggleLike(c, c._id)}
                    style={{
                      color: likedCards.includes(c._id) ? 'red' : 'blue',
                      fontSize: '1rem',
                      fontWeight: 'bolder',
                      pointerEvents: likedCards.includes(c._id) ? 'none' : 'auto',
                      opacity: likedCards.includes(c._id) ? 0.5 : 1,

                    }}
                  >
                    {likedCards.includes(c._id) ? 'Liked' : 'Like'}
                  </button>}
                </div>
              </div> */}


              {isBusiness && isAdmin &&
                <div className={`flex justify-center items-center mt-1 `}>
                  <button className="flex items-center mr-2 p-1 rounded-md text-lg bg-gray-300 dark:bg-gray-700">
                    <FaPencilAlt className="text-gray-500 dark:text-gray-300"
                      onClick={() => Navigate(`/cardEdit/${c._id}`)}
                    />
                  </button>
                </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
