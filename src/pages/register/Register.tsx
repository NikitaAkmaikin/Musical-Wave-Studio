import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import s from './Register.module.scss';
import { register } from '../../utils/api';

interface RegisterFormValues {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();

  const onFinish = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const data = await register(values);
      notification.success({ message: 'Успешная регистрация' });

      const { token } = data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch {
      console.error('Ошибка при регистрации:');
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
      <form onSubmit={handleSubmit(onFinish)} className={s.authForm}style={{color: '#000'}}>
        <h2>Регистрация</h2>

        <div>
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Введите email',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Введите корректный email',
              },
            }}
            render={({ field }) => <Input {...field} placeholder="Введите email" />}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Введите пароль' }}
            render={({ field }) => <Input.Password {...field} placeholder="Введите пароль" />}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Зарегистрироваться
          </Button>
        </div>

        <div>
          <Link to="/login">
            <Button icon={<ArrowLeftOutlined />} type="primary">
              Вернуться назад
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
