import { FC } from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../services/root-store-context';

const MusicModal: FC = observer(() => {
  const { musicStore } = useStores();

  return (
    <Modal
      title={musicStore.selectedDirection?.title}
      open={musicStore.isModalVisible}
      onCancel={() => musicStore.closeModal()}
      footer={null}
    >
      <img
        src={musicStore.selectedDirection?.image}
        alt={musicStore.selectedDirection?.title}
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <p>{musicStore.selectedDirection?.details}</p>
    </Modal>
  );
});

export default MusicModal;
