import axios from 'axios';
import { dev } from '../const/href';

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface MusicCardData {
  title: string;
  description: string;
  details: string;
  image?: File;
}

export interface SubscriptionData {
  title: string;
  description: string;
  price: string;
  details: string;
}
export interface RegisterData{
  email: string;
  password: string;
}

// Функция для отправки данных контактной формы
export const sendContactForm = async (values: ContactFormValues) => {
  try {
    const response = await axios.post(`${dev}/api/contact`, values);
    return response.data;
  } catch {
    throw new Error('Ошибка отправки формы');
  }
};

// ------------------------------------------------------------------------------------

// Функция для регистрации пользователя
export const register = async (values: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${dev}/api/auth/register`, values);
    return response.data;
  } catch {
    throw new Error('Ошибка при регистрации');
  }
};

// ------------------------------------------------------------------------------------

// Функция для добавления музыкальной карточки
export const addMusicCard = async (data: MusicCardData) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('details', data.details);

  if (data.image) {
    formData.append('image', data.image);
  }

  const response = await axios.post(`${dev}/api/music-directions`, formData);
  return response.data;
};

// Функция для удаления музыкальной карточки
export const deleteMusicCard = async (id: number) => {
  const response = await axios.delete(`${dev}/api/music-directions/${id}`);
  return response.data;
};

// ------------------------------------------------------------------------------------

// Получение списка абонементов
export const fetchSubscriptions = async () => {
  const response = await axios.get(`${dev}/api/subscriptions`);
  return response.data;
};

// Добавление абонемента
export const addSubscription = async (data: SubscriptionData) => {
  const response = await axios.post(`${dev}/api/subscriptions`, data);
  return response.data;
};

// Удаление абонемента
export const deleteSubscription = async (id: number) => {
  const response = await axios.delete(`${dev}/api/subscriptions/${id}`);
  return response.data;
};

// ------------------------------------------------------------------------------------
