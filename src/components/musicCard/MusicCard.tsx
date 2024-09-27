import { FC } from 'react';
import { Card } from 'antd';
import { useMusicStore } from '../../services/store/MusicStore';

interface MusicCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const MusicCard:FC<MusicCardProps> = ({ id, title, description, image }) => {
  const musicStore = useMusicStore();

  return (
    <Card
      hoverable
      cover={<img alt={title} src={image} />}
      title={title}
      onClick={() => musicStore.openModal({ id, title, description, image, details: 'Дополнительная информация об этом направлении' })}  // Открытие модального окна
    >
      <p>{description}</p>
    </Card>
  );
};

export default MusicCard;
