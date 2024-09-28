import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import MusicCard from '../../components/musicCard/MusicCard';
import MusicModal from '../../components/modal/MusicModal';
import { useStores } from '../../services/root-store-context';
import AddMusic from '../../components/addMusic/AddMusic';

export const MusicDirections: React.FC = observer(() => {
  const { musicStore } = useStores();

  useEffect(() => {
    // Загружаем музыкальные направления при монтировании компонента
    musicStore.fetchDirections();
  }, []);

  if (musicStore.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (musicStore.error) {
    return <p>{musicStore.error}</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Музыкальные направления</h1>
      <AddMusic />
      {musicStore.directions.length <= 0 ? (
        <p>Ничего нет</p>
      ) : (
        <Row
          gutter={[16, 16]}
          style={{ boxSizing: 'border-box' }}
        >
          {musicStore.directions.map(direction => (
            <Col
              key={direction.id}
              xs={24}
              sm={12}
              md={8}
            >
              <MusicCard {...direction} />
            </Col>
          ))}
        </Row>
      )}
      <MusicModal />
    </div>
  );
});

export default MusicDirections;
