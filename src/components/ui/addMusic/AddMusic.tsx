// import React, { useState, memo } from 'react';
// import s from './AddMusic.module.scss';
// import { useStores } from '../../../services/root-store-context';

// const AddMusic: React.FC = memo(() => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [details, setDetails] = useState('');
//   const { musicStore } = useStores();

//   const resetFields = () => {
//     setTitle('');
//     setDescription('');
//     setImage('');
//     setDetails('');
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     musicStore.addMusic({ title, description, image, details });
//     resetFields();
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
//         value={image}
//         onChange={e => setImage(e.target.value)}
//         placeholder="Image URL"
//       />
//       <textarea
//         value={details}
//         onChange={e => setDetails(e.target.value)}
//         placeholder="Details"
//       />
//       <button type="submit">Add Music</button>
//     </form>
//   );
// });

// export default AddMusic;
