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
  selectedSubscription: Subscription | null = null;
  isModalVisible = false;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openModal(subscription: Subscription) {
    this.selectedSubscription = subscription;
    this.isModalVisible = true;
  }

  closeModal() {
    this.selectedSubscription = null;
    this.isModalVisible = false;
  }

  async fetchSubscriptions() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get(
        `${dev}/api/subscriptions`
      );
      runInAction(() => {
        this.subscriptions = response.data;
      });
    } catch (error) {
      this.error = 'Не удалось загрузить абонементы';
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async addSubscription(newSubscription: Omit<Subscription, 'id'>) {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.post(
        `${dev}api/subscriptions`,
        newSubscription
      );
      this.subscriptions.push(response.data);
    } catch (error) {
      this.error = 'Не удалось добавить абонемент';
    } finally {
      this.isLoading = false;
    }
  }

  // Метод для удаления абонемента
  async deleteSubscription(id: number) {
    this.isLoading = true;
    this.error = null;

    try {
      await axios.delete(`${dev}/api/subscriptions/${id}`);
      this.subscriptions = this.subscriptions.filter(
        subscription => subscription.id !== id
      ); // Удаляем абонемент из состояния
    } catch (error) {
      this.error = 'Ошибка при удалении абонемента';
    } finally {
      this.isLoading = false;
    }
  }
}

export default new SubscriptionStore();
