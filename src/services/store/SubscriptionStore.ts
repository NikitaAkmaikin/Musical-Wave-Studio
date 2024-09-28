import axios from 'axios';
import { makeAutoObservable } from 'mobx';

interface Subscription {
  id: number;
  title: string;
  description: string;
  price: string;
  details: string; // Подробная информация о подписке
}

class SubscriptionStore {
  subscriptions: Subscription[] = [];
  selectedSubscription: Subscription | null = null; // Выбранная подписка
  isModalVisible = false;
  isLoading = false; // Для отслеживания состояния загрузки
  error: string | null = null; // Для хранения ошибок

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для открытия модального окна
  openModal(subscription: Subscription) {
    this.selectedSubscription = subscription;
    this.isModalVisible = true;
  }

  // Метод для закрытия модального окна
  closeModal() {
    this.selectedSubscription = null;
    this.isModalVisible = false;
  }

  // Метод для получения всех абонементов с сервера
  async fetchSubscriptions() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get(
        'http://localhost:5000/api/subscriptions'
      );
      this.subscriptions = response.data; // Обновляем список абонементов
    } catch (error) {
      this.error = 'Не удалось загрузить абонементы';
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для добавления нового абонемента
  async addSubscription(newSubscription: Omit<Subscription, 'id'>) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/subscriptions',
        newSubscription
      );
      this.subscriptions.push(response.data); // Добавляем новый абонемент в список
    } catch (error) {
      this.error = 'Не удалось добавить абонемент';
    } finally {
      this.isLoading = false;
    }
  }
}

export default new SubscriptionStore();
