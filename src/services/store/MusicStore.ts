import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

interface MusicDirection {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;  // Добавляем поле для подробной информации
}

class MusicStore {
  directions: MusicDirection[] = [
    { id: 1, title: 'Барабаны', description: 'Описание курса по барабанам', image: '/images/drums.jpg', details: 'Подробная информация о курсе по барабанам.' },
    { id: 2, title: 'Гитара', description: 'Описание курса по гитаре', image: '/images/guitar.jpg', details: 'Подробная информация о курсе по гитаре.' },
    { id: 3, title: 'Клавишные', description: 'Описание курса по клавишным', image: '/images/piano.jpg', details: 'Подробная информация о курсе по клавишным.' },
    { id: 4, title: 'Вокал', description: 'Описание курса по вокалу', image: '/images/vocal.jpg', details: 'Подробная информация о курсе по вокалу.' },
  ];

  selectedDirection: MusicDirection | null = null;  // Выбранное музыкальное направление
  isModalVisible = false;

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
}

const MusicStoreContext = createContext(new MusicStore());
export const useMusicStore = () => useContext(MusicStoreContext);
