import React from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SubscriptionData } from '../../services/api';

interface SubscriptionFormProps {
  onSubmit: (values: SubscriptionData) => void;
  loading: boolean;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: SubscriptionData) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
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
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading}>
          Добавить абонемент
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubscriptionForm;
