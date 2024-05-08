import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardType, ErrorType } from "../@types/types";
import { getCardById } from "../services/cards";
import defaultImage from "../assets/user-regular-new.png";

const Card = () => {

  const { id } = useParams();
  const [card, setCard] = useState<CardType>();
  const [error, setError] = useState<ErrorType>();

  if (error) {
    return (
      <div>
        <h2>{error.message}</h2>
      </div>
    );
  }

  useEffect(() => {
    getCardById(id ?? "")
      .then((res) => {
        setCard(res.data);
      })
      .catch((e) => {
        const status = e.response.status;
        const message = e.message;
        const details = e.response.data;

        setError({ status, message, details });
      });
  }, []);
  return (
    <div className="flex justify-center items-center gap-5 mt-2">
      <div className="flex flex-col justify-center items-center p-5 rounded-md text-center bg-gray-200 m-2  dark:bg-slate-500 dark:text-white">
        <img
          src={card?.image ? card?.image.url : defaultImage}
          alt={card?.image ? card?.image.alt : "No image available"}
          className="w-72 h-48 object-cover mt-3"
          onError={(e: any) => {
            e.target.onError = null;
            e.target.src = defaultImage;
          }}
        />
        <div className="mt-1">
          <h2 style={{ color: "#ff7e66" }} className="text-l">{card?.title}</h2>
          <p className="text-sm">{card?.subtitle}</p>
          <p className="text-sm">{card?.phone}</p>
          <p className="text-sm">{card?.email}</p>
          <p className="text-sm">{card?.web}</p>

        </div>

      </div>
    </div>
  );
};

export default Card;