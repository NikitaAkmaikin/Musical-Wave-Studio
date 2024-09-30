import { FC, memo } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';

interface SubscriptionCardProps {
  id: number;
  title: string;
  description: string;
  price: string;
  details: string;
}

const SubscriptionCard: FC<SubscriptionCardProps> = memo(
  ({ id, title, description, price, details }) => {
    const { subscriptionStore } = useStores();

    const handleCardClick = () => {
      subscriptionStore.openModal({
        id,
        title,
        description,
        price,
        details,
      });
    };

    return (
      <Card
        hoverable
        title={title}
        onClick={handleCardClick}
      >
        <p>{description}</p>
        <p>{price}</p>
      </Card>
    );
  }
);

export default SubscriptionCard;
