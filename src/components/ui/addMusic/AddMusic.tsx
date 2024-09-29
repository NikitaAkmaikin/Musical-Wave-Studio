import React, { useState } from 'react';
import s from './AddMusic.module.scss'; // Подключаем стили
import { useStores } from '../../../services/root-store-context';

const AddSubscription: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [details, setDetails] = useState('');
  const { musicStore } = useStores();

  const resetUse = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setDetails('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Данные для отправки
    const newMusic = {
      title,
      description,
      image,
      details,
    };

    musicStore.addDirection(newMusic);
    resetUse();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={s.subscriptionForm}
    >
      <h2>Добавить новое мероприятие</h2>
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
      <button
        type="submit"
        className={s.submitBtn}
      >
        Добавить
      </button>
    </form>
  );
};

export default AddSubscription;
