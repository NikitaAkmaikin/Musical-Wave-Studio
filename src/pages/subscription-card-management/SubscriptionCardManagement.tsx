import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { notification, Spin } from 'antd';
import { useStores } from '../../services/root-store-context';
import { fetchSubscriptions, addSubscription, deleteSubscription, SubscriptionData } from '../../utils/api';
import SubscriptionForm from '../../components/adminDashboard/subscription/SubscriptionForm';
import SubscriptionList from '../../components/adminDashboard/subscription/SubscriptionList';

const SubscriptionCardManagement: React.FC = observer(() => {
  const { subscriptionStore } = useStores();
  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const loadSubscriptions = async () => {
      setListLoading(true);
      try {
        const subscriptions = await fetchSubscriptions();
        subscriptionStore.setSubscriptions(subscriptions); // Предполагаем, что у store есть метод setSubscriptions
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        notification.error({
          message: 'Ошибка загрузки',
          description: 'Не удалось загрузить список абонементов.',
        });
      } finally {
        setListLoading(false);
      }
    };

    loadSubscriptions();
  }, [subscriptionStore]);

  const handleAddSubscription = async (values: SubscriptionData) => {
    setActionLoading(true);
    try {
      const newSubscription = await addSubscription(values);
      subscriptionStore.addSubscription(newSubscription); // Локально обновляем store
      notification.success({ message: 'Абонемент добавлен успешно!' });
    } catch {
      console.error('Ошибка добавления:');
      notification.error({
        message: 'Ошибка добавления',
        description: 'Попробуйте снова.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSubscription = async (id: number) => {
    setActionLoading(true);
    try {
      await deleteSubscription(id);
      subscriptionStore.removeSubscription(id); // Локально обновляем store
      notification.success({ message: 'Абонемент удалён успешно!' });
    } catch {
      console.error('Ошибка удаления:');
      notification.error({
        message: 'Ошибка удаления',
        description: 'Попробуйте снова.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-direction-column">
      <h2>Управление абонементами</h2>
      <SubscriptionForm onSubmit={handleAddSubscription} loading={actionLoading} />
      <div className="backgroundCard" style={{ marginTop: '20px' }}>
        {listLoading ? (
          <Spin />
        ) : (
          <SubscriptionList
            items={subscriptionStore.subscriptions}
            onDelete={handleDeleteSubscription}
            loading={actionLoading}
          />
        )}
      </div>
    </div>
  );
});

export default SubscriptionCardManagement;
