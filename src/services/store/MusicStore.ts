import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

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
      runInAction(() => {
        this.directions = response.data; // Обновляем список музыкальных направлений
      });
    } catch (error) {
      this.error = 'Ошибка при загрузке музыкальных направлений';
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Метод для добавления нового музыкального направления
  async addMusic(newDirection: Omit<MusicDirection, 'id'>) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/music-directions',
        newDirection
      );
      this.directions.push(response.data); // Добавляем новое направление с ID, полученным с сервера
    } catch (error) {
      this.error = 'Ошибка при добавлении музыкального направления';
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для удаления музыкального направления
  async deleteMusic(id: number) {
    this.isLoading = true;
    this.error = null;
    try {
      await axios.delete(`http://localhost:5000/api/music-directions/${id}`);
      this.directions = this.directions.filter(
        direction => direction.id !== id
      ); // Удаляем направление из состояния
    } catch (error) {
      this.error = 'Ошибка при удалении музыкального направления';
    } finally {
      this.isLoading = false;
    }
  }
}

export default new MusicStore();
