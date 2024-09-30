import { FC, memo } from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../services/root-store-context';
import { Link } from 'react-router-dom';

const MusicModal: FC = observer(() => {
  const { musicStore } = useStores();

  const handleClose = () => {
    musicStore.closeModal();
  };

  return (
    <Modal
      title={musicStore.selectedDirection?.title}
      open={musicStore.isModalVisible}
      onCancel={handleClose}
      footer={null}
    >
      <img
        alt={musicStore.selectedDirection?.title}
        src={musicStore.selectedDirection?.image}
      />
      <p>{musicStore.selectedDirection?.description}</p>
      <Link to="/contact">
        <Button type="primary">Связаться с нами</Button>
      </Link>
    </Modal>
  );
});

export default memo(MusicModal);
