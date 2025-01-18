import React from 'react';
import { Button, List, Empty } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface SubscriptionListProps {
  items: Array<{
    id: number;
    title: string;
    description: string;
    price: string;
    details: string;
  }>;
  onDelete: (id: number) => void;
  loading: boolean;
}

const SubscriptionList: React.FC<SubscriptionListProps> = ({ items, onDelete, loading }) => {
  if (items.length === 0) {
    return <Empty description="Список пуст" />;
  }

  return (
    <List
      bordered
      dataSource={items}
      renderItem={(item, index) => (
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
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            {/* Нумерация в отдельной колонке */}
            <div style={{ minWidth: '30px', textAlign: 'center' }}>
              <strong>{index + 1}</strong>
            </div>

            {/* Основной контент */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Название:</strong> {item.title}</div>
              <div><strong>Описание:</strong> {item.description}</div>
              <div><strong>Цена:</strong> {item.price}</div>
              <div><strong>Детали:</strong> {item.details}</div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default SubscriptionList;
