import { FC, memo } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';

interface MusicCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
}

const MusicCard: FC<MusicCardProps> = memo(
  ({ id, title, description, image }) => {
    const { musicStore } = useStores();

    const handleCardClick = () => {
      musicStore.openModal({
        id,
        title,
        description,
        image,
        details: 'Дополнительная информация об этом направлении',
      });
    };

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
        onClick={handleCardClick}
      >
        <p>{description}</p>
      </Card>
    );
  }
);

export default MusicCard;
