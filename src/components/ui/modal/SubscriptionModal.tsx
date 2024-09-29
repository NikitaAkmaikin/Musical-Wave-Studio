import { FC } from 'react';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../services/root-store-context';
import { Link } from 'react-router-dom';

const SubscriptionModal: FC = observer(() => {
  const { subscriptionStore } = useStores();

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
      <Link to="/contact">
        <Button type="primary">Связаться с нами</Button>
      </Link>
    </Modal>
  );
});

export default SubscriptionModal;
