import { FC, useState } from 'react'; 
import { Input, Button, notification, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useUser } from '../../services/store/UserContext';
import { ContactFormValues, sendContactForm } from '../../utils/api';

const ContactForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  
  // Инициализация react-hook-form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: user?.email || '',
      phone: '',
      message: '',
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsLoading(true);

    try {
      await sendContactForm(values); // Вызов функции отправки данных
      message.success('Сообщение отправлено');
      notification.success({
        message: 'Сообщение отправлено',
        description: 'Ваше сообщение успешно отправлено!',
      });

      reset(); // Очистка формы
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      notification.error({
        message: 'Ошибка',
        description: 'Не удалось отправить сообщение. Попробуйте позже.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="name">Имя</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Введите ваше имя' }}
          render={({ field }) => (
            <Input {...field} placeholder="Введите ваше имя" />
          )}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Введите корректный email',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: 'Введите корректный email'
            }
          }}
          render={({ field }) => (
            <Input {...field} placeholder={user?.email || 'Введите ваш email'} />
          )}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="phone">Телефон</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Введите ваш номер телефона',
            pattern: {
              value: /^\+?[78][-(]?\d{3}\)?[-]?\d{3}[-]?\d{2}[-]?\d{2}$/,
              message: 'Введите корректный номер телефона'
            }
          }}
          render={({ field }) => (
            <Input {...field} placeholder="+7 123 456-7890" />
          )}
        />
        {errors.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="message">Сообщение</label>
        <Controller
          name="message"
          control={control}
          rules={{ required: 'Введите ваше сообщение' }}
          render={({ field }) => (
            <Input.TextArea {...field} placeholder="Введите ваше сообщение" rows={4} />
          )}
        />
        {errors.message && <p style={{ color: 'red' }}>{errors.message.message}</p>}
      </div>

      <div>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          Отправить
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
