// import React, { useState, memo } from 'react';
// import axios from 'axios';
// import s from './AddSubscription.module.scss';
// import { useStores } from '../../../services/root-store-context';

// const AddSubscription: React.FC = memo(() => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [details, setDetails] = useState('');
//   const { subscriptionStore } = useStores();

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     subscriptionStore.addSubscription({ title, description, price, details });
//     resetFields();
//   };

//   const resetFields = () => {
//     setTitle('');
//     setDescription('');
//     setPrice('');
//     setDetails('');
//   };

//   return (
//     <form
//       className={s.form}
//       onSubmit={handleSubmit}
//     >
//       <input
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         placeholder="Title"
//       />
//       <input
//         value={description}
//         onChange={e => setDescription(e.target.value)}
//         placeholder="Description"
//       />
//       <input
//         value={price}
//         onChange={e => setPrice(e.target.value)}
//         placeholder="Price"
//       />
//       <textarea
//         value={details}
//         onChange={e => setDetails(e.target.value)}
//         placeholder="Details"
//       />
//       <button type="submit">Add Subscription</button>
//     </form>
//   );
// });

// export default AddSubscription;
