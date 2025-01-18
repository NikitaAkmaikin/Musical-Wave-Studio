import { FC, useState } from 'react'; 
import { Form, Input, Button, notification, message } from 'antd';
import { useUser } from '../../services/store/UserContext';
import { ContactFormValues, sendContactForm } from '../../utils/api';

const ContactForm: FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const onFinish = async (values: ContactFormValues) => {
    setIsLoading(true);

    try {
      await sendContactForm(values); // Вызов вынесенной функции
      message.success('Сообщение отправлено')
      notification.success({
        message: 'Сообщение отправлено',
        description: 'Ваше сообщение успешно отправлено!',
      });

      form.resetFields(); // Очистка формы
    } catch {
      console.error('Ошибка при отправке формы:');
      notification.error({
        message: 'Ошибка',
        description: 'Не удалось отправить сообщение. Попробуйте позже.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Введите ваше имя' }]}
      >
        <Input placeholder="Введите ваше имя" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, type: 'email', message: 'Введите корректный email' },
        ]}
      >
        <Input
          placeholder={user?.email || 'Введите ваш email'}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Телефон"
        rules={[
          { required: true, message: 'Введите ваш номер телефона' },
          { pattern: /^\+?[78][-(]?\d{3}\)?[-]?\d{3}[-]?\d{2}[-]?\d{2}$/, message: 'Введите корректный номер телефона' },
        ]}
      >
        <Input placeholder="+7 123 456-7890" />
      </Form.Item>

      <Form.Item
        name="message"
        label="Сообщение"
        rules={[{ required: true, message: 'Введите ваше сообщение' }]}
      >
        <Input.TextArea placeholder="Введите ваше сообщение" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
        >
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
