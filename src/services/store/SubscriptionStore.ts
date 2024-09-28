import { makeAutoObservable } from 'mobx';
// import { createContext, useContext } from 'react';

interface Subscription {
  id: number;
  title: string;
  description: string;
  price: string;
  details: string; // Подробная информация о подписке
}

class SubscriptionStore {
  subscriptions: Subscription[] = [
    {
      id: 1,
      title: 'Абонемент 1 месяц',
      description: 'Доступ на 1 месяц',
      price: '5000 руб.',
      details: 'Подробная информация о 1-месячном абонементе.',
    },
    {
      id: 2,
      title: 'Абонемент 3 месяца',
      description: 'Доступ на 3 месяца',
      price: '14000 руб.',
      details: 'Подробная информация о 3-месячном абонементе.',
    },
    {
      id: 3,
      title: 'Пробное занятие',
      description: 'Одно занятие для ознакомления',
      price: '1000 руб.',
      details: 'Подробная информация о пробном занятии.',
    },
  ];

  selectedSubscription: Subscription | null = null; // Выбранная подписка
  isModalVisible = false;

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
}

export default new SubscriptionStore();
// const SubscriptionStoreContext = createContext(new SubscriptionStore());
// export const useSubscriptionStore = () => useContext(SubscriptionStoreContext);
