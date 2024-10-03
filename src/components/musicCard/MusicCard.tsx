import { FC, memo } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';
import s from './MusicCard.module.scss';

interface MusicCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  isModal?: boolean;
}

const MusicCard: FC<MusicCardProps> = memo(
  ({ id, title, description, image, isModal = false }) => {
    const { musicStore } = useStores();

    const handleCardClick = () => {
      if (!isModal) {
        musicStore.openModal({
          id,
          title,
          description,
          image,
          details: 'Дополнительная информация об этом направлении',
        });
      }
    };

    const imageUrl = `http://localhost:5000/uploads/${image}`;

    return (
      <Card
        hoverable={!isModal}
        className={s.card}
        cover={
          <div className={s.imageContainer}>
            <img
              alt={title}
              src={imageUrl}
              className={s.image}
            />
          </div>
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
