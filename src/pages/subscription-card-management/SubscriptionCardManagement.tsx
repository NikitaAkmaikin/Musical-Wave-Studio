import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, List, Input, Form } from 'antd';
import { useStores } from '../../services/root-store-context';
import { PlusOutlined } from '@ant-design/icons';

const SubscriptionCardManagement: React.FC = observer(() => {
  const { subscriptionStore } = useStores();
  const [form] = Form.useForm();

  useEffect(() => {
    subscriptionStore.fetchSubscriptions();
  }, [subscriptionStore]);

  const onAddSubscription = (values: any) => {
    subscriptionStore.addSubscription(values);
    form.resetFields();
  };

  return (
    <div className="flex-direction-column">
      <h2>Управление абонементами</h2>

      <Form
        form={form}
        onFinish={onAddSubscription}
        layout="inline"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Введите заголовок' }]}
        >
          <Input placeholder="Название" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <Input placeholder="Описание" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <Input placeholder="Цена" />
        </Form.Item>
        <Form.Item
          name="details"
          rules={[{ required: true, message: 'Подробная информация' }]}
        >
          <Input placeholder="Подробная информация" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
        >
          Добавить направление
        </Button>
      </Form>
      <div className="backgrountCard">
        <List
          bordered
          dataSource={subscriptionStore.subscriptions}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  onClick={() => subscriptionStore.deleteSubscription(item.id)}
                  danger
                >
                  Удалить
                </Button>,
              ]}
            >
              {item.title}: {item.price}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
});

export default SubscriptionCardManagement;
