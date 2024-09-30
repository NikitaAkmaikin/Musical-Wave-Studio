import { FC, memo } from 'react';
import { Card } from 'antd';
import { useStores } from '../../services/root-store-context';
import s from './MusicCard.module.scss';  // Подключаем стили

interface MusicCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  isModal?: boolean;  // Новый пропс для определения модального режима
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
        hoverable={!isModal}  // Убираем hover эффект, если карточка в модальном окне
        className={s.card}  // Добавляем класс для стилизации
        cover={
          <div className={s.imageContainer}>
            <img
              alt={title}
              src={imageUrl}
              className={s.image}  // Используем классы для стилизации
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
