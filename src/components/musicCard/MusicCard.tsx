import { FC, memo, useCallback } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';
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
        className={`transform transition-transform duration-300 ${
          !isModal ? 'hover:translate-y-[-5px] hover:shadow-lg' : ''
        } rounded-lg border border-transparent`}
        cover={
          <div className="relative overflow-hidden rounded-lg">
            <img
              alt={title}
              src={imageUrl}
              className={`w-full h-auto object-cover rounded-lg transition-opacity duration-300 ${!isModal ? 'hover:opacity-80' : ''}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-placeholder.png'; // Файл-заглушка
              }}
            />
          </div>
        }
        title={title}
        onClick={handleCardClick}
      >
        <p className="text-sm text-gray-700">{isModal ? details : description}</p>
      </Card>
    );
  }
);

export default MusicCard;
