import React, { useState } from 'react';
import axios from 'axios';
import s from'./AddSubscription.module.scss'; // Подключаем стили

const AddSubscription: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newSubscription = {
      title,
      description,
      price,
      details,
    };

    axios
      .post('http://localhost:5000/api/subscriptions', newSubscription)
      .then(response => {
        console.log('Абонемент успешно добавлен:', response.data);
      })
      .catch(error => {
        console.error('Ошибка при добавлении абонемента:', error);
      });
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
        value={price}
        onChange={e => setPrice(e.target.value)}
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
