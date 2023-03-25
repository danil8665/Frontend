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
    await fetch('http://127.0.0.1:80/auth/register', {
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

  return (
    <>
    </>
    
  );
};

export default Register;

// const onFinish = async (values: any) => {
//   const formData = new FormData();
//   formData.append('file', file ? file : '');
//   formData.append('product', JSON.stringify(values))

//   await fetch('http://127.0.0.1:80/upload', {
//     method: "POST",
//     body: formData
//   });
//   console.log('Success:', values);
// };