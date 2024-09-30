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
  selectedDirection: MusicDirection | null = null;
  isModalVisible = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Открытие модального окна
  openModal(direction: MusicDirection) {
    this.selectedDirection = direction;
    this.isModalVisible = true;
  }

  // Закрытие модального окна
  closeModal() {
    this.selectedDirection = null;
    this.isModalVisible = false;
  }

  // Получение всех музыкальных направлений с сервера
  async fetchDirections() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get('http://localhost:5000/api/music-directions');
      runInAction(() => {
        this.directions = response.data;
      });
    } catch (error) {
      this.error = 'Ошибка при загрузке музыкальных направлений';
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Метод для добавления нового музыкального направления (изменённый для работы с FormData)
  async addMusic(newDirection: FormData) {
    this.isLoading = true;
    this.error = null;
  
    try {
      const response = await axios.post('http://localhost:5000/api/music-directions', newDirection, {
        headers: {
          'Content-Type': 'multipart/form-data', // Устанавливаем заголовок для отправки файлов
        },
      });
      runInAction(() => {
        this.directions.push(response.data);  // Добавляем новое направление
      });
    } catch (error) {
      this.error = 'Ошибка при добавлении музыкального направления';
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  
  
  // Удаление музыкального направления
  async deleteMusic(id: number) {
    this.isLoading = true;
    this.error = null;

    try {
      await axios.delete(`http://localhost:5000/api/music-directions/${id}`);
      runInAction(() => {
        this.directions = this.directions.filter(direction => direction.id !== id);
      });
    } catch (error) {
      this.error = 'Ошибка при удалении музыкального направления';
    } finally {
      this.isLoading = false;
    }
  }
}

export default new MusicStore();
