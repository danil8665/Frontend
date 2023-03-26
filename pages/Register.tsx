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
    await fetch('{API_URL}/auth/register', {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
  };
  return (
    <>
    </>
    
  );
};

export default Register;