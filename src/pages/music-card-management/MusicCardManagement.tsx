import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../services/root-store-context';

const MusicCardManagement: React.FC = observer(() => {
  const { musicStore } = useStores();

  useEffect(() => {
    console.log('Компонент MusicCardManagement смонтирован');
    musicStore.fetchDirections();
  }, [musicStore]);

  if (musicStore.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (musicStore.directions.length === 0) {
    return <p>Нет музыкальных направлений.</p>;
  }

  return (
    <div>
      <h2>Управление музыкальными направлениями</h2>
      {musicStore.directions.map((direction) => (
        <div key={direction.id}>
          <h3>{direction.title}</h3>
          <p>{direction.description}</p>
        </div>
      ))}
    </div>
  );
});

export default MusicCardManagement;
