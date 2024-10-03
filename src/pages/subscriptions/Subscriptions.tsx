import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Skeleton } from 'antd';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';
import SubscriptionModal from '../../components/ui/modal/SubscriptionModal';
import { useStores } from '../../services/root-store-context';

const mocData = [
  {
    id: 1,
    title: 'Стартовый абонемент',
    price: "5000",
    description: 'Абонемент на 4 занятия. Идеально для тех, кто хочет попробовать несколько направлений.',
    details: '1 месяц',
  },
  {
    id: 2,
    title: 'Абонемент "Стандарт"',
    price: "1000",
    description: 'Абонемент на 8 занятий. Подходит для регулярных занятий по выбранному направлению.',
    details: '2 месяца',
  },
  {
    id: 3,
    title: 'Абонемент "Премиум"',
    price: "1500",
    description: 'Абонемент на 12 занятий с расширенными возможностями и доступом к студийным сессиям.',
    details: '3 месяца',
  },
  {
    id: 4,
    title: 'Безлимитный абонемент',
    price: "2500",
    description: 'Безлимитный доступ ко всем направлениям на протяжении 6 месяцев. Для тех, кто хочет интенсивно заниматься.',
    details: '6 месяцев',
  },
  {
    id: 5,
    title: 'Разовое занятие',
    price: "1500",
    description: 'Один урок по выбранному направлению для ознакомления.',
    details: '1 занятие',

  },
];

export const Subscriptions: FC = observer(() => {
  const { subscriptionStore } = useStores();

  useEffect(() => {
    subscriptionStore.fetchSubscriptions();
  }, []);

  if (subscriptionStore.isLoading) {
    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Абонементы</h1>
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
      <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
        {mocData.map((subscription) => (
          <Col key={subscription.id} xs={24} sm={12} md={8}>
            <SubscriptionCard {...subscription} />
          </Col>
        ))}
      </Row>
      <p className='text-aling'>Не удалось загрузить остальные абонементы</p>
      <SubscriptionModal />
    </div>
  );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>Абонементы</h1>
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
