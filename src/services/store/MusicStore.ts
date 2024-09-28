import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

interface MusicDirection {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;
}

class MusicStore {
  directions: MusicDirection[] = [];
  selectedDirection: MusicDirection | null = null; // Выбранное музыкальное направление
  isModalVisible = false;
  isLoading = false; // Для отслеживания состояния загрузки
  error: string | null = null; // Для хранения ошибок

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для открытия модального окна
  openModal(direction: MusicDirection) {
    this.selectedDirection = direction;
    this.isModalVisible = true;
  }

  // Метод для закрытия модального окна
  closeModal() {
    this.selectedDirection = null;
    this.isModalVisible = false;
  }

  // Метод для получения всех музыкальных направлений с сервера
  async fetchDirections() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get(
        'http://localhost:5000/api/music-directions'
      );
      this.directions = response.data; // Обновляем список музыкальных направлений
    } catch (error) {
      this.error = 'Ошибка при загрузке музыкальных направлений';
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для добавления нового музыкального направления
  async addDirection(newDirection: Omit<MusicDirection, 'id'>) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/music-directions',
        newDirection
      );
      this.directions.push(response.data); // Добавляем новое направление в список
    } catch (error) {
      this.error = 'Ошибка при добавлении музыкального направления';
    } finally {
      this.isLoading = false;
    }
  }
}

const MusicStoreContext = createContext(new MusicStore());
export const useMusicStore = () => useContext(MusicStoreContext);

export default new MusicStore();
