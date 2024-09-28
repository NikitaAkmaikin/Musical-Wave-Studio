import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import MusicCard from '../../components/musicCard/MusicCard';
import MusicModal from '../../components/modal/MusicModal';
import { useStores } from '../../services/root-store-context';

export const MusicDirections: React.FC = observer(() => {
  const { musicStore } = useStores();

  return (
    <div>
      <h1>Музыкальные направления</h1>
      <Row gutter={[16, 16]}>
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
      <MusicModal />
    </div>
  );
});

export default MusicDirections;
