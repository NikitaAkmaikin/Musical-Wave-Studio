import React, { useState } from 'react';
import { useUser } from '../../services/store/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import s from './Login.module.scss'; // Подключаем стили
import { ArrowLeftOutlined } from '@ant-design/icons';

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
    <div className={s.authContainer}>
      <Form
        onFinish={onFinish}
        layout="vertical"
        className={s.authForm}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <h2>Вход</h2>
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
        <Link to="/register">
          <Button type="primary">Зарегистрироваться</Button>
        </Link>
        <Link to="/">
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
          >
            Вернуться назад
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
