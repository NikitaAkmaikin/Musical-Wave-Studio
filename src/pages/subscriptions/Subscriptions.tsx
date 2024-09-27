import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';
import { useSubscriptionStore } from '../../services/store/SubscriptionStore';
import SubscriptionModal from '../../components/modal/SubscriptionModal';

export const Subscriptions: React.FC = observer(() => {
  const subscriptionStore = useSubscriptionStore();

  return (
    <div>
      <h1>Абонементы</h1>
      <Row gutter={[16, 16]}>
        {subscriptionStore.subscriptions.map(subscription => (
          <Col key={subscription.id} xs={24} sm={12} md={8}>
            <SubscriptionCard {...subscription} />
          </Col>
        ))}
      </Row>
      <SubscriptionModal />  {/* Модальное окно */}

    </div>
  );
});

export default Subscriptions;
