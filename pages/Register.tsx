import { LockOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, } from 'antd';
import React, { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import Link from 'next/link';

const { Option } = Select;

const Register: React.FC = () => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    await fetch('http://127.0.0.1:3080/auth/register', {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

// 'http://localhost:3080/auth/register'

  return (
    <>

{/* 
<Drawer
  title="Регистрация"
  width={360}
  onClose={onClose}
  open={open}
  bodyStyle={{ paddingBottom: 80 }}
>

  <Form
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 25 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
  >     

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
        label="Введите логин"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин или почта" />
      </Form.Item>

      <Form.Item
        label="Ведите пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input.Password
          placeholder="Введите пароль"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType='submit'>
          Регистрация
        </Button>
      </Form.Item>
    </Form>
  </Drawer> */}

    </>
    
  );
};

export default Register;