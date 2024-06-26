import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/user-regular-new.png";
import { useCards } from "../hooks/useCards";

const FavoriteCards = () => {
  const { cards } = useCards();
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const favoriteCards = cards.filter(card => favorites.includes(card._id));

  return (
    <div className="flex flex-col dark:bg-gray-600">
      <h1 className="text-3xl font-bold mb-4">Favorite Cards</h1>
      <div className="flex flex-wrap justify-center items-center gap-5 mt-2 dark:text-white">
        {favoriteCards.map((c) => (
          <div key={c._id} className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-gray-200 m-2 dark:bg-slate-500 relative drop-shadow-md">
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
                <h2 style={{ color: "#ff7e66" }} className="text-l">{c.title}</h2>
                <p className="text-sm">{c.subtitle}</p>
                <p className="text-sm">{c.phone}</p>
                <p className="text-sm">{c.email}</p>
                <p className="text-sm">{c.web}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCards;