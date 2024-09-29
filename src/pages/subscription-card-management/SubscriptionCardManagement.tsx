import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../services/root-store-context';

const SubscriptionCardManagement: React.FC = observer(() => {
  const { subscriptionStore } = useStores();

  useEffect(() => {
    console.log('Компонент SubscriptionCardManagement смонтирован');
    subscriptionStore.fetchSubscriptions();
  }, [subscriptionStore]);

  if (subscriptionStore.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (subscriptionStore.subscriptions.length === 0) {
    return <p>Нет абонементов.</p>;
  }

  return (
    <div>
      <h2>Управление абонементами</h2>
      {subscriptionStore.subscriptions.map((subscription) => (
        <div key={subscription.id}>
          <h3>{subscription.title}</h3>
          <p>{subscription.price}</p>
        </div>
      ))}
    </div>
  );
});

export default SubscriptionCardManagement;
