import { FC } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';

interface SubscriptionCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  id,
  title,
  description,
  price,
}) => {
  const { subscriptionStore } = useStores();

  return (
    <Card
      hoverable
      title={title}
      onClick={() =>
        subscriptionStore.openModal({
          id,
          title,
          description,
          price,
          details: 'Дополнительная информация об этом абонементе',
        })
      } // Открытие модального окна
    >
      <p>{description}</p>
      <p>
        <strong>Цена: {price}</strong>
      </p>
    </Card>
  );
};

export default SubscriptionCard;
