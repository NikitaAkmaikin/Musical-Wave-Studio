import { FC, useState } from 'react';
import { Form, Input, Button } from 'antd';

const ContactForm: FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: any) => {
    setIsLoading(true);
    console.log('Submitted:', values);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[{ required: true, message: 'Введите имя' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Введите email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="message"
        label="Сообщение"
        rules={[{ required: true, message: 'Введите сообщение' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
