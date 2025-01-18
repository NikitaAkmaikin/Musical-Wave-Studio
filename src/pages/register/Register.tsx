import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import s from './Register.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { register } from '../../services/api';


const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      const data = await register(values);
      notification.success({ message: 'Успешная регистрация' });

      const { token } = data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error.message);
      notification.error({
        message: 'Ошибка',
        description: error.message || 'Ошибка при регистрации',
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
