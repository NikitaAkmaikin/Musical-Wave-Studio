// import React, { useEffect, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { Button, List, Input, Form, notification, Spin } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { useStores } from '../../services/root-store-context';
// import { addMusicCard, deleteMusicCard } from '../../services/api';
// import { dev } from '../../const/href';

// const MusicCardManagement: React.FC = observer(() => {
//   const { musicStore } = useStores();
//   const [form] = Form.useForm();
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     musicStore.fetchDirections();
//   }, [musicStore]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const onAddMusicCard = async (values: any) => {
//     setLoading(true);
//     try {
//       await addMusicCard({ ...values, image: file });
//       notification.success({ message: 'Направление добавлено успешно!' });
//       musicStore.fetchDirections(); // Обновление списка
//       form.resetFields();
//       setFile(null);
//     } catch (error: any) {
//       console.error('Ошибка добавления:', error);
//       notification.error({
//         message: 'Ошибка добавления',
//         description: error.response?.data?.message || 'Попробуйте снова.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     setLoading(true);
//     try {
//       await deleteMusicCard(id);
//       notification.success({ message: 'Направление удалено успешно!' });
//       musicStore.fetchDirections(); // Обновление списка
//     } catch (error: any) {
//       console.error('Ошибка удаления:', error);
//       notification.error({
//         message: 'Ошибка удаления',
//         description: error.response?.data?.message || 'Попробуйте снова.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex-direction-column">
//       <h2>Управление Мероприятиями</h2>

//       <Form form={form} onFinish={onAddMusicCard} layout="inline">
//         <Form.Item name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
//           <Input placeholder="Название" />
//         </Form.Item>
//         <Form.Item name="description" rules={[{ required: true, message: 'Введите описание' }]}>
//           <Input placeholder="Описание" />
//         </Form.Item>
//         <Form.Item name="details" rules={[{ required: true, message: 'Подробная информация' }]}>
//           <Input placeholder="Подробная информация" />
//         </Form.Item>
//         <Form.Item>
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading}>
//             Добавить направление
//           </Button>
//         </Form.Item>
//       </Form>

//       <div className="backgrountCard">
//         {loading ? (
//           <Spin />
//         ) : (
//           <List
//             bordered
//             dataSource={musicStore.directions}
//             renderItem={item => (
//               <List.Item
//                 actions={[
//                   <Button
//                     onClick={() => handleDelete(item.id)}
//                     danger
//                     loading={loading}
//                   >
//                     Удалить
//                   </Button>,
//                 ]}
//               >
//                 <img
//                   src={`${dev}/api/music-directions/image/${item.image}`}
//                   alt={item.title}
//                   style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                 />
//                 {item.title}: {item.description}
//               </List.Item>
//             )}
//           />
//         )}
//       </div>
//     </div>
//   );
// });

// export default MusicCardManagement;
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { notification, Spin } from 'antd';
import { useStores } from '../../services/root-store-context';
import { addMusicCard, deleteMusicCard } from '../../utils/api';
import MusicCardForm from '../../components/musicAdminDashboard/MusicCardForm';
import MusicCardList from '../../components/musicAdminDashboard/MusicCardList';
import { dev } from '../../const/href';

const MusicCardManagement: React.FC = observer(() => {
  const { musicStore } = useStores();
  const [listLoading, setListLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setListLoading(true);
      await musicStore.fetchDirections();
      setListLoading(false);
    };

    fetchData();
  }, [musicStore]);

  const handleAddMusicCard = async (values: any, file: File | null) => {
    setActionLoading(true);
    try {
      const newCard = await addMusicCard({ ...values, image: file });
      musicStore.directions.push(newCard); // Локальное обновление списка
      notification.success({ message: 'Направление добавлено успешно!' });
    } catch (error: any) {
      console.error('Ошибка добавления:', error);
      notification.error({
        message: 'Ошибка добавления',
        description: error.response?.data?.message || 'Попробуйте снова.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteMusicCard = async (id: number) => {
    setActionLoading(true);
    try {
      await deleteMusicCard(id);
      musicStore.directions = musicStore.directions.filter((item) => item.id !== id); // Локальное обновление
      notification.success({ message: 'Направление удалено успешно!' });
    } catch (error: any) {
      console.error('Ошибка удаления:', error);
      notification.error({
        message: 'Ошибка удаления',
        description: error.response?.data?.message || 'Попробуйте снова.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex-direction-column">
      <h2>Управление Мероприятиями</h2>
      <MusicCardForm onSubmit={handleAddMusicCard} loading={actionLoading} />
      <div className="backgroundCard" style={{ marginTop: '20px' }}>
        {listLoading ? (
          <Spin />
        ) : (
          <MusicCardList
            items={musicStore.directions.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              image: `${dev}/api/music-directions/image/${item.image}`,
            }))}
            onDelete={handleDeleteMusicCard}
            loading={actionLoading}
          />
        )}
      </div>
    </div>
  );
});

export default MusicCardManagement;
