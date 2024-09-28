import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';

import SubscriptionModal from '../../components/modal/SubscriptionModal';
import { useStores } from '../../services/root-store-context';
import AddSubscription from '../../components/addSubscription/AddSubscription';

export const Subscriptions: FC = observer(() => {
  const { subscriptionStore } = useStores();

  useEffect(() => {
    // Загружаем абонементы при монтировании компонента
    subscriptionStore.fetchSubscriptions();
  }, []);

  if (subscriptionStore.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (subscriptionStore.error) {
    return <p>{subscriptionStore.error}</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Абонементы</h1>
      <AddSubscription />
      <Row
        gutter={[16, 16]}
        style={{ boxSizing: 'border-box' }}
      >
        {subscriptionStore.subscriptions.map(subscription => (
          <Col
            key={subscription.id}
            xs={24}
            sm={12}
            md={8}
          >
            <SubscriptionCard {...subscription} />
          </Col>
        ))}
      </Row>
      <SubscriptionModal />
    </div>
  );
});

export default Subscriptions;
