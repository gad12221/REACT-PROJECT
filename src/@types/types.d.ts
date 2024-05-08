import { ReactNode } from "react";


//טיפוס לפונקציה שמקבלת ילדים ומחזירה אלמנט של ראקט

export type FCC = ({ children: ReactNode }) => ReactNode;

export type RegisterUser = {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  image?: {
    url: string;
    alt?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
  isAdmin: boolean;
};


export type LoginUser = {
  email: string;
  password: string;
}



export type CardType = {
  map(arg0: (c: any) => import("react/jsx-runtime").JSX.Element): ReactNode;
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
    _id: string;
  };
  bizNumber: number;
  likes: string[];
  user_id: string;
  createdAt: string;
  __v: number;
  like: {
    user_id: string;
  }

};

export type ErrorType = {
  status: number;
  message: string;
  details: string;
};

export type CreateCardType = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  },
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  },

};

export type JwtDecodeType = {
  _id: string;
  iat: number;
  exp: number;
  isBusiness: boolean;
  isAdmin: boolean;
}