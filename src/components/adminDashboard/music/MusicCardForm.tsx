import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { MusicCardData } from '../../../utils/api';

interface MusicCardFormProps {
  onSubmit: (values: MusicCardData, file: File | null) => void;
  loading: boolean;
}

const MusicCardForm: React.FC<MusicCardFormProps> = ({ onSubmit, loading }) => {
  const { control, handleSubmit, reset } = useForm<MusicCardData>();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Уменьшаем изображение и конвертируем его в WebP
      const webpFile = await convertToWebP(selectedFile);
      setFile(webpFile);
    }
  };

  // Функция для конвертации изображения в WebP
  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Определяем размеры изображения
          const maxWidth = 800; // Максимальная ширина
          const maxHeight = 800; // Максимальная высота
          const width = img.width;
          const height = img.height;
          let newWidth = width;
          let newHeight = height;

          // Пропорционально уменьшаем изображение
          if (width > height) {
            if (width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (height * maxWidth) / width;
            }
          } else {
            if (height > maxHeight) {
              newHeight = maxHeight;
              newWidth = (width * maxHeight) / height;
            }
          }

          // Устанавливаем размеры canvas
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Конвертируем изображение в формат WebP
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], file.name, { type: 'image/webp' });
                resolve(webpFile); // Возвращаем новый файл в формате WebP
              } else {
                reject(new Error('Ошибка при конвертации изображения.'));
              }
            },
            'image/webp', // Тип изображения
            0.8 // Качество изображения (от 0 до 1)
          );
        }
      };
    });
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
          render={({ field }) => <Input {...field} placeholder="Название" />}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="description">Описание</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Введите описание' }}
          render={({ field }) => <Input {...field} placeholder="Описание" />}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="details">Подробная информация</label>
        <Controller
          name="details"
          control={control}
          rules={{ required: 'Введите подробную информацию' }}
          render={({ field }) => <Input {...field} placeholder="Подробная информация" />}
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
