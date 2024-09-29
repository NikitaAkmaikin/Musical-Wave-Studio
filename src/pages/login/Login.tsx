import React, { useState } from 'react';
import { useUser } from '../../services/store/UserContext';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

const Login: React.FC = () => {
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      notification.success({ message: 'Успешный вход' });
      navigate('/'); // Перенаправляем на главную страницу
    } catch (error) {
      console.error('Ошибка при входе:', error);
      notification.error({ message: 'Неверные учетные данные' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Введите email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
