import { FC } from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../services/root-store-context';

const MusicModal: FC = observer(() => {
  const { musicStore } = useStores();

  const handleDelete = () => {
    const directionId = musicStore.selectedDirection?.id;
    if (directionId !== undefined) {
      musicStore.deleteDirection(directionId);
      musicStore.closeModal();
    } else {
      // Обработка случая, когда id не определен (например, показать сообщение об ошибке)
      console.error('Direction ID is undefined');
    }
  };

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

      <Button
        type="text"
        onClick={handleDelete}
      >
        Удалить
      </Button>
    </Modal>
  );
});

export default MusicModal;
