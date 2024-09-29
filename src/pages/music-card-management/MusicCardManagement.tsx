import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, List, Input, Form } from 'antd';
import { useStores } from '../../services/root-store-context';

const MusicCardManagement: React.FC = observer(() => {
  const { musicStore } = useStores();
  const [form] = Form.useForm();

  useEffect(() => {
    // Загружаем направления при монтировании компонента
    musicStore.fetchDirections();
  }, [musicStore]);

  const onAddMusicCard = (values: any) => {
    musicStore.addDirection(values);
    form.resetFields();
  };

  return (
    <div>
      <h2>Управление музыкальными направлениями</h2>

      <Form
        form={form}
        onFinish={onAddMusicCard}
        layout="inline"
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Введите заголовок' }]}
        >
          <Input placeholder="Название" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'Введите описание' }]}
        >
          <Input placeholder="Описание" />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[{ required: true, message: 'Цена' }]}
        >
          <Input placeholder="картинка" />
        </Form.Item>
        <Form.Item
          name="details"
          rules={[{ required: true, message: 'Подробная информация' }]}
        >
          <Input placeholder="Подробная информация" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Добавить направление
          </Button>
        </Form.Item>
      </Form>

      <List
        bordered
        dataSource={musicStore.directions}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                onClick={() => musicStore.deleteDirection(item.id)}
                danger
              >
                Удалить
              </Button>,
            ]}
          >
            {item.title}: {item.description}
          </List.Item>
        )}
      />
    </div>
  );
});

export default MusicCardManagement;
