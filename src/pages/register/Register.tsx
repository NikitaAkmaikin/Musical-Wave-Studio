import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import s from './Register.module.scss'; // Подключаем стили
import { ArrowLeftOutlined } from '@ant-design/icons';

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      // Отправляем запрос на сервер для регистрации
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        values
      );
      notification.success({ message: 'Успешная регистрация' });

      // Сохраняем токен и перенаправляем пользователя на главную страницу
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      notification.error({
        message: 'Ошибка',
        description: 'Ошибка при регистрации',
      });
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
      >
        <h2>Регистрация</h2>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Введите email' },
            { type: 'email', message: 'Введите корректный email' },
          ]}
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
            Зарегистрироваться
          </Button>
        </Form.Item>
        <Link to="/login">
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

export default Register;
