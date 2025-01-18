import React, { useState } from 'react';
import { useUser } from '../../services/store/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import s from './Login.module.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Инициализация формы с react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const onFinish = async (values: LoginFormValues) => {
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
      <form onSubmit={handleSubmit(onFinish)} className={s.authForm} style={{ display: 'flex', flexDirection: 'column', gap: '10px', color: '#000' }}>
        <h2>Вход</h2>
        
        <div>
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Введите email' }}
            render={({ field }) => (
              <Input {...field} placeholder="Введите email" />
            )}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Пароль</label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Введите пароль' }}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Введите пароль" />
            )}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </div>

        <div>
          <Link to="/register">
            <Button type="primary">Зарегистрироваться</Button>
          </Link>
        </div>

        <div>
          <Link to="/">
            <Button icon={<ArrowLeftOutlined />} type="primary">
              Вернуться назад
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
