import { FC, memo } from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../services/root-store-context';
import { Link } from 'react-router-dom';
import MusicCard from '../../musicCard/MusicCard';
const MusicModal: FC = observer(() => {
  const { musicStore } = useStores();

  const handleClose = () => {
    musicStore.closeModal();
  };

  return (
    <Modal
      // title={musicStore.selectedDirection?.title}
      open={musicStore.isModalVisible}
      onCancel={handleClose}
      footer={null}
      width={600}  // Увеличим ширину для большего контента
    >
      {musicStore.selectedDirection && (
        <MusicCard 
          id={musicStore.selectedDirection.id}
          title={musicStore.selectedDirection.title}
          description={musicStore.selectedDirection.description}
          image={musicStore.selectedDirection.image}
          isModal={true}  // Передаем флаг для модального отображения
        />
      )}
      <Link to="/contact">
        <Button type="primary" style={{ marginTop: '16px' }}>
          Связаться с нами
        </Button>
      </Link>
    </Modal>
  );
});

export default memo(MusicModal);
