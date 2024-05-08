import { FC, ReactNode } from "react";
import "./Card.scss";
interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className="card-component">{children}</div>;
};

export default Card;