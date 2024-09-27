import { FC } from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useSubscriptionStore } from '../../services/store/SubscriptionStore';

const SubscriptionModal:FC = observer(() => {
  const subscriptionStore = useSubscriptionStore();

  return (
    <Modal
      title={subscriptionStore.selectedSubscription?.title}
      open={subscriptionStore.isModalVisible}
      onCancel={() => subscriptionStore.closeModal()}
      footer={null}
    >
      <p><strong>Цена: {subscriptionStore.selectedSubscription?.price}</strong></p>
      <p>{subscriptionStore.selectedSubscription?.details}</p>
    </Modal>
  );
});

export default SubscriptionModal;
