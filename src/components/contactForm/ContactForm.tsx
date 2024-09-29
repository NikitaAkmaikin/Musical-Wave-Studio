import { FC, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const ContactForm: FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      // Отправляем данные формы на сервер
      const response = await axios.post(
        'http://localhost:5000/api/contact/send',
        values
      );
      console.log('Ответ сервера:', response.data);

      // Показываем уведомление об успешной отправке
      notification.success({
        message: 'Сообщение отправлено',
        description: 'Ваше сообщение успешно отправлено!',
      });

      // Очищаем форму
      form.resetFields();
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
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Введите имя' }]}
        style={{ color: '#fff' }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Введите email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="message"
        label="Сообщение"
        rules={[{ required: true, message: 'Введите сообщение' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
