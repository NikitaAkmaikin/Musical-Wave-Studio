import React, { useState } from 'react';
import axios from 'axios';
import s from'./AddMusic.module.scss'; // Подключаем стили

const AddSubscription: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Данные для отправки
    const newMusic = {
      title,
      description,
      image,
      details,
    };

    // Отправка POST-запроса на сервер
    axios
      .post('http://localhost:5000/api/music-directions', newMusic)
      .then(response => {
        console.log('Музыкальное направление успешно добавлен:', response.data);
        setTitle('');
        setDescription('');
        setImage('');
        setDetails('');
      })
      .catch(error => {
        console.error('Ошибка при добавлении Музыкального направления:', error);
      });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.subscriptionForm}>
      <h2>Добавить новый абонемент</h2>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Название абонемента"
        required
        className={s.formInput}
      />
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание"
        required
        className={s.formInput}
      />
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        placeholder="Цена"
        required
        className={s.formInput}
      />
       <input
        type="text"
        value={details}
        onChange={e => setDetails(e.target.value)}
        placeholder="Подробная информация"
        required
        className={s.formInput}
      />
      <button type="submit" className={s.submitBtn}>Добавить</button>
    </form>
  );
};

export default AddSubscription;
