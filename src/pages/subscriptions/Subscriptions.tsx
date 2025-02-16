import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Skeleton } from 'antd';
import SubscriptionCard from '../../components/subscriptionCard/SubscriptionCard';
import SubscriptionModal from '../../components/ui/modal/SubscriptionModal';
import { useStores } from '../../services/root-store-context';

const Subscriptions: FC = observer(() => {
  const { subscriptionStore } = useStores();

  useEffect(() => {
    subscriptionStore.fetchSubscriptions();
  }, []);

  if (subscriptionStore.isLoading) {
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Скидки</h1>
        <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Skeleton active />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (subscriptionStore.error) {
    return (
    <div className="container">
      <p className='text-aling'>Не удалось загрузить Скидки</p>
      <SubscriptionModal />
    </div>
  );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Скидки</h1>
      <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
        {subscriptionStore.subscriptions.map((subscription) => (
          <Col key={subscription.id} xs={24} sm={12} md={8}>
            <SubscriptionCard {...subscription} />
          </Col>
        ))}
      </Row>
      <SubscriptionModal />
    </div>
  );
});

export default Subscriptions;