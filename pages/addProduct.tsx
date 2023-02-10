import React, { useEffect, useState } from 'react';
import {
  VideoCameraOutlined,
  HomeOutlined,
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Card, Carousel, Cascader, Checkbox, Col, DatePicker, FloatButton, Form, Image, Input, InputNumber, MenuProps, Modal, Radio, Rate, Row, Select, Tabs, Tooltip, TreeSelect, Upload } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import Link from 'next/link';
import Login from './Login';
import Register from './Register';
import MySearch from './Search';
import FastOrder from './FastOrder';
import TextArea from 'antd/lib/input/TextArea';
import CommentModal from './CommentModal';


const { Header, Content, Footer, Sider } = Layout;

const AddProduct:React.FC= () => {
    

  let secondsToGo = 4;

  const [visible, setVisible] = useState(false);

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

  setTimeout(() => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  }, 3000);
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

    const onFinish = async (values: any) => {
        await fetch('http://127.0.0.1:3080/product', {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        console.log('Success:', values);
      };

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={60}>
      <div className="logo">

        </div>
        <Menu theme="dark"> 
          <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная</Link></Menu.Item>
          <Menu.Item key={2}><SearchOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Категории</Menu.Item>
          <Menu.Item key={3}><UserOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль</Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
      <div className="homepage_wrap">
        <Header className="site-layout-background" style={{ padding: 0 }} >
        <div className="header">
                  <div className="search">
                   <MySearch />
                  </div> 
            </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" 
              style={{
                margin: 5,
                padding: 2,
              }}>     
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='center'>
        
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item label="Добавление продукта">
        </Form.Item>
        <Form.Item 
         name="manufacturer"
         label="Производитель">
          <Input />
        </Form.Item>
        <Form.Item 
         name="name"
         label="Название">
          <Input />
        </Form.Item>
        <Form.Item 
         name="price"
         label="Цена">
          <InputNumber />
        </Form.Item>
        <Form.Item 
         name="discount"
         label="Скидка">
          <InputNumber />
        </Form.Item>
        <Form.Item 
         name="picture"
         label="Описание продукта">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Фото" valuePropName="fileList">
        <Upload
      listType="picture-card"
        >
        <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Выберите файл</div>
            </div>
    </Upload>
        </Form.Item>
        <Form.Item
                 noStyle
                 shouldUpdate
                 >
                {({ getFieldsValue }) => {
                  const { manufacturer, name, picture, discount, price } = getFieldsValue();
                  const formIsComplete = !!manufacturer && !!name && !!discount && !!price ;
                  return (
                  <Button
                   type="primary"
                   htmlType="submit"
                   className="loginFormButton"
                   disabled={!formIsComplete}
                   >
                    Добавить
                  </Button>
              );
            }}
                </Form.Item>
      </Form>

</Row>
      </div>
              <FloatButton.BackTop />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        Dixi Shoes ©2022 
            <br/>
            <div className="icons">
            <Link href='https://www.instagram.com/dixi_zp/'>
            <InstagramOutlined />
            </Link>
            &nbsp;
            <Link href='https://m.facebook.com/profile.php?id=100063913516314'>
            <FacebookOutlined href='/'/>
            </Link>
            </div>
        </Footer>
        </div>
      </Layout>
    </Layout>
  );
}
export default AddProduct;