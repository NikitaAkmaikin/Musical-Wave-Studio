import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, List, Input, Form } from 'antd';
import { useStores } from '../../services/root-store-context';
import { PlusOutlined } from '@ant-design/icons';

const MusicCardManagement: React.FC = observer(() => {
  const { musicStore } = useStores();
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    musicStore.fetchDirections();
  }, [musicStore]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const onAddMusicCard = (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('details', values.details);
    
    if (file) {
      formData.append('image', file);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    musicStore.addMusic(formData);
    form.resetFields();
    setFile(null);
  };

  return (
    <div className="flex-direction-column">
      <h2>Управление музыкальными направлениями</h2>

      <Form form={form} onFinish={onAddMusicCard} layout="inline">
        <Form.Item name="title" rules={[{ required: true, message: 'Введите заголовок' }]}>
          <Input placeholder="Название" />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: true, message: 'Введите описание' }]}>
          <Input placeholder="Описание" />
        </Form.Item>
        <Form.Item name="details" rules={[{ required: true, message: 'Подробная информация' }]}>
          <Input placeholder="Подробная информация" />
        </Form.Item>
        <Form.Item>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Добавить направление
          </Button>
        </Form.Item>
      </Form>

      <div className="backgrountCard">
        <List
          bordered
          dataSource={musicStore.directions}
          renderItem={item => (
            <List.Item
              actions={[
                <Button onClick={() => musicStore.deleteMusic(item.id)} danger>
                  Удалить
                </Button>,
              ]}
            >
              <img
                src={`http://localhost:5000/api/music-directions/image/${item.image}`}
                alt={item.title}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              {item.title}: {item.description}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
});

export default MusicCardManagement;
