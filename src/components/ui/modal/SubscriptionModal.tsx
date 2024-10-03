import { FC, memo } from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../services/root-store-context';
import { Link } from 'react-router-dom';

const SubscriptionModal: FC = observer(() => {
  const { subscriptionStore } = useStores();

  const handleClose = () => {
    subscriptionStore.closeModal();
  };

  return (
    <Modal
      title={subscriptionStore.selectedSubscription?.title}
      open={subscriptionStore.isModalVisible}
      onCancel={handleClose}
      footer={null}
    >
      <p>{subscriptionStore.selectedSubscription?.description}</p>
      <p>{subscriptionStore.selectedSubscription?.details}</p>
      <Link to="/contact">
        <Button type="primary">Связаться с нами</Button>
      </Link>
    </Modal>
  );
});

export default memo(SubscriptionModal);
