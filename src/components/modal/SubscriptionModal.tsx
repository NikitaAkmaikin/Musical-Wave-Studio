import { FC } from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../services/root-store-context';

const SubscriptionModal: FC = observer(() => {
  const { subscriptionStore } = useStores();
  const handleDelete = () => {
    const directionId = subscriptionStore.selectedSubscription?.id;
    if (directionId !== undefined) {
      subscriptionStore.deleteSubscription(directionId);
      subscriptionStore.closeModal();
    } else {
      // Обработка случая, когда id не определен (например, показать сообщение об ошибке)
      console.error('Direction ID is undefined');
    }
  };
  return (
    <Modal
      title={subscriptionStore.selectedSubscription?.title}
      open={subscriptionStore.isModalVisible}
      onCancel={() => subscriptionStore.closeModal()}
      footer={null}
    >
      <p>
        <strong>Цена: {subscriptionStore.selectedSubscription?.price}</strong>
      </p>
      <p>{subscriptionStore.selectedSubscription?.details}</p>
      <Button
        type="text"
        onClick={handleDelete}
      >
        Удалить
      </Button>
    </Modal>
  );
});

export default SubscriptionModal;
