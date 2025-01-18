import React from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { SubscriptionData } from '../../utils/api';

interface SubscriptionFormProps {
  onSubmit: (values: SubscriptionData) => void;
  loading: boolean;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSubmit, loading }) => {
  // Инициализация react-hook-form
  const { control, handleSubmit, reset } = useForm<SubscriptionData>();

  const onFormSubmit = (values: SubscriptionData) => {
    onSubmit(values);
    reset(); // Сбросить форму
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="title">Название</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Введите заголовок' }}
          render={({ field }) => (
            <Input {...field} placeholder="Название" />
          )}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="description">Описание</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Введите описание' }}
          render={({ field }) => (
            <Input {...field} placeholder="Описание" />
          )}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="price">Цена</label>
        <Controller
          name="price"
          control={control}
          rules={{ required: 'Введите цену' }}
          render={({ field }) => (
            <Input {...field} placeholder="Цена" />
          )}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="details">Подробная информация</label>
        <Controller
          name="details"
          control={control}
          rules={{ required: 'Подробная информация' }}
          render={({ field }) => (
            <Input {...field} placeholder="Подробная информация" />
          )}
        />
      </div>

      <div>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          loading={loading}
        >
          Добавить абонемент
        </Button>
      </div>
    </form>
  );
};

export default SubscriptionForm;