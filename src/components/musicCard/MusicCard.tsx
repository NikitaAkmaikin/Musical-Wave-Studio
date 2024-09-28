import { FC } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';

interface MusicCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const MusicCard: FC<MusicCardProps> = ({ id, title, description, image }) => {
  const { musicStore } = useStores();

  return (
    <Card
      hoverable
      cover={
        <img
          alt={title}
          src={image}
        />
      }
      title={title}
      onClick={() =>
        musicStore.openModal({
          id,
          title,
          description,
          image,
          details: 'Дополнительная информация об этом направлении',
        })
      } // Открытие модального окна
    >
      <p>{description}</p>
    </Card>
  );
};

export default MusicCard;
