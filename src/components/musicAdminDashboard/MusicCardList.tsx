import React from 'react';
import { Button, List, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface MusicCardListProps {
  items: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
  onDelete: (id: number) => void;
  loading: boolean;
}

const MusicCardList: React.FC<MusicCardListProps> = ({ items, onDelete, loading }) => {
  if (items.length === 0) {
    return <Empty description="Список пуст" />;
  }

  return (
    <List
      bordered
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={loading}
              onClick={() => onDelete(item.id)}
            >
              Удалить
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
              />
            }
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default MusicCardList;
