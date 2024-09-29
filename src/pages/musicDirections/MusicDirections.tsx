import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import MusicCard from '../../components/musicCard/MusicCard';
import MusicModal from '../../components/ui/modal/MusicModal';
import { useStores } from '../../services/root-store-context';
import AddMusic from '../../components/ui/addMusic/AddMusic';
import { useUser } from '../../services/store/UserContext';
import s from './MusicDirections.module.scss';

export const MusicDirections: React.FC = observer(() => {
  const { musicStore } = useStores();
  const { user } = useUser();

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
    <div className={s.container}>
      <h1>Музыкальные направления</h1>
      {user && <AddMusic />}
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
