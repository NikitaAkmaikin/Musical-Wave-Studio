import { FC, memo, useCallback } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';
import s from './MusicCard.module.scss';
import { dev } from '../../const/href';

interface MusicCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  details: string;
  isModal?: boolean;
}

const getImageUrl = (image: string) => `${dev}/uploads/${image}`;

const MusicCard: FC<MusicCardProps> = memo(
  ({ id, title, description, image, details, isModal = false }) => {
    const { musicStore } = useStores();

    const handleCardClick = useCallback(() => {
      if (!isModal) {
        musicStore.openModal({
          id,
          title,
          description,
          image,
          details,
        });
      }
    }, [id, title, description, image, details, isModal, musicStore]);

    const imageUrl = getImageUrl(image);

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
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-placeholder.png'; // Файл-заглушка
              }}
            />
          </div>
        }
        title={title}
        onClick={handleCardClick}
      >
        {isModal ? <p>{details}</p> : <p>{description}</p>}
      </Card>
    );
  }
);

export default MusicCard;
