import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Skeleton } from 'antd';
import MusicCard from '../../components/musicCard/MusicCard';
import MusicModal from '../../components/ui/modal/MusicModal';
import { useStores } from '../../services/root-store-context';

export const MusicDirections: React.FC = observer(() => {
  const { musicStore } = useStores();

  useEffect(() => {
    musicStore.fetchDirections();
  }, []);

  if (musicStore.isLoading) {
    return (
      <div className="container">
        <h1>Ассортимент</h1>
        <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Skeleton active />
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (musicStore.error) {
    return ( <div className='container'>
      {/* <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {mocData.map((direction) => (
            <Col key={direction.id} xs={24} sm={12} md={6}>
              <MusicCard {...direction} />
            </Col>
          ))}
        </Row> */}
      <MusicModal />
        <p className='text-aling'>Не удалось загрузить Ассортимент</p>
      </div>);
  }

  return (
    <div className="container">
      <h1 style={{marginBottom: '30px'}}>Ассортимент</h1>
      {musicStore.directions.length <= 0 ? (
        <p>Ничего нет</p>
      ) : (
        <Row gutter={[16, 16]} style={{ boxSizing: 'border-box' }}>
          {musicStore.directions.map((direction) => (
            <Col key={direction.id} xs={24} sm={12} md={6}>
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
