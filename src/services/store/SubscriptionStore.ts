import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { dev } from '../../const/href';

interface Subscription {
  id: number;
  title: string;
  description: string;
  price: string;
  details: string;
}

class SubscriptionStore {
  subscriptions: Subscription[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Установка списка абонементов
  setSubscriptions(subscriptions: Subscription[]) {
    this.subscriptions = subscriptions;
  }

  // Добавление нового абонемента
  addSubscription(newSubscription: Subscription) {
    this.subscriptions.push(newSubscription);
  }

  // Удаление абонемента по ID
  removeSubscription(id: number) {
    this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
  }

  // Получение списка абонементов
  async fetchSubscriptions() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get(`${dev}/api/subscriptions`);
      runInAction(() => {
        this.subscriptions = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Не удалось загрузить абонементы';
      });
      console.error('Ошибка при загрузке абонементов:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Добавление абонемента через API
  async addSubscriptionToApi(newSubscription: Omit<Subscription, 'id'>) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post(`${dev}/api/subscriptions`, newSubscription);
      runInAction(() => {
        this.subscriptions.push(response.data);
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Не удалось добавить абонемент';
      });
      console.error('Ошибка при добавлении абонемента:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Удаление абонемента через API
  async deleteSubscriptionFromApi(id: number) {
    this.isLoading = true;
    this.error = null;

    try {
      await axios.delete(`${dev}/api/subscriptions/${id}`);
      runInAction(() => {
        this.subscriptions = this.subscriptions.filter((sub) => sub.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при удалении абонемента';
      });
      console.error('Ошибка при удалении абонемента:', error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default new SubscriptionStore();
