import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { MusicCardData } from '../../utils/api';

interface MusicCardFormProps {
  onSubmit: (values: MusicCardData, file: File | null) => void;
  loading: boolean;
}

const MusicCardForm: React.FC<MusicCardFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit, reset } = useForm<MusicCardData>();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onFormSubmit = (values: MusicCardData) => {
    onSubmit(values, file);
    reset();
    setFile(null);
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
        <label htmlFor="details">Подробная информация</label>
        <Controller
          name="details"
          control={control}
          rules={{ required: 'Введите подробную информацию' }}
          render={({ field }) => (
            <Input {...field} placeholder="Подробная информация" />
          )}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="file">Изображение</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </div>

      <div>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          loading={loading}
        >
          Добавить направление
        </Button>
      </div>
    </form>
  );
};

export default MusicCardForm;
