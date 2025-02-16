import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { notification, Spin } from 'antd';
import { useStores } from '../../services/root-store-context';
import { addMusicCard, deleteMusicCard, MusicCardData } from '../../utils/api';
import MusicCardForm from '../../components/adminDashboard/music/MusicCardForm';
import MusicCardList from '../../components/adminDashboard/music/MusicCardList';
import { dev } from '../../const/href';

const MusicCardManagement: React.FC = observer(() => {
  const { musicStore } = useStores();
  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setListLoading(true);
      await musicStore.fetchDirections();
      setListLoading(false);
    };

    fetchData();
  }, [musicStore]);

  const handleAddMusicCard = async (values: MusicCardData, file: File | null) => {
    setActionLoading(true);
    try {
      const newCard = await addMusicCard({ ...values, image: file });
      musicStore.directions.push(newCard); // Локальное обновление списка
      notification.success({ message: 'Направление добавлено успешно!' });
    } catch {
      console.error('Ошибка добавления:');
      notification.error({
        message: 'Ошибка добавления',
        description:'Попробуйте снова.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteMusicCard = async (id: number) => {
    setActionLoading(true);
    try {
      await deleteMusicCard(id);
      musicStore.directions = musicStore.directions.filter((item) => item.id !== id); // Локальное обновление
      notification.success({ message: 'Направление удалено успешно!' });
    } catch{
      console.error('Ошибка удаления:');
      notification.error({
        message: 'Ошибка удаления',
        description: 'Попробуйте снова.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-direction-column">
      <h2>Управление Ассортиментом</h2>
      <MusicCardForm onSubmit={handleAddMusicCard} loading={actionLoading} />
      <div className="backgroundCard" style={{ marginTop: '20px' }}>
        {listLoading ? (
          <Spin />
        ) : (
          <MusicCardList
            items={musicStore.directions.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              image: `${dev}/api/music-products/image/${item.image}`,
            }))}
            onDelete={handleDeleteMusicCard}
            loading={actionLoading}
          />
        )}
      </div>
    </div>
  );
});

export default MusicCardManagement;
