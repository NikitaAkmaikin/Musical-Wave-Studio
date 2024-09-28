import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Отправка данных для логина
    axios
      .post('http://localhost:5000/api/auth/login', { email, password })
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Сохраняем токен в localStorage
        console.log('Авторизация успешна!');
      })
      .catch(error => {
        console.error('Ошибка при авторизации:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Войти</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;

// import axios from 'axios';

// const token = localStorage.getItem('token');  // Получаем токен из localStorage

// axios.post('http://localhost:5000/api/music-directions', {
//   title: 'Новое направление',
//   description: 'Описание нового направления',
// }, {
//   headers: {
//     Authorization: `Bearer ${token}`,  // Добавляем токен в заголовок
//   },
// }).then(response => {
//   console.log('Новое направление создано:', response.data);
// }).catch(error => {
//   console.error('Ошибка при создании направления:', error);
// });
