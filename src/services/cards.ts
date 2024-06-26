import axios from "axios";
import { CardType, CreateCardType } from "../@types/types";

export const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";


export const getCards = () => axios.get(`${baseUrl}/cards`);
export const getCardById = (id: string) => axios.get(`${baseUrl}/cards/${id}`);
export const myCardByApi = () => {
  return axios.get(`${baseUrl}/cards/my-cards`, {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    }
  });

}
export const createCard = (data: CreateCardType) => {
  return axios.post(`${baseUrl}/cards`, data, {
    headers: {
      'x-auth-token': localStorage.getItem('token'),

    },
  });
}

export const editCard = (data: CreateCardType, id: string | undefined) => {
  return axios.put(`${baseUrl}/cards/${id}`, data, {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  });
}
export const likedCard = (data: CardType, id: string) => {
  return axios.patch(`${baseUrl}/cards/${id}`, data, {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    }
  });
};
export const unLikedCard = (data: CardType, id: string) => {
  return axios.patch(`${baseUrl}/cards/${id}`, data, {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    }
  });
};

export const deleteCard = (id: string) => {
  return axios.delete(`${baseUrl}/cards/${id}`, {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  });
}



export const cards = {
  getCards,
  getCardById,
  createCard,
  myCardByApi,
  editCard,
  deleteCard,
}
