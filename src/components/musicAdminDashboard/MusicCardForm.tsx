import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MusicCardData } from '../../utils/api';

interface MusicCardFormProps {
  onSubmit: (values: MusicCardData, file: File | null) => void;
  loading: boolean;
}

const MusicCardForm: React.FC<MusicCardFormProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFinish = (values: MusicCardData) => {
    onSubmit(values, file);
    form.resetFields();
    setFile(null);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item name="description" rules={[{ required: true, message: 'Введите описание' }]}>
        <Input placeholder="Описание" />
      </Form.Item>
      <Form.Item name="details" rules={[{ required: true, message: 'Введите подробную информацию' }]}>
        <Input placeholder="Подробная информация" />
      </Form.Item>
      <Form.Item>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading}>
          Добавить направление
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MusicCardForm;
