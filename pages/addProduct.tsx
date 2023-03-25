import React, { useEffect, useState } from 'react';
import {
  VideoCameraOutlined,
  HomeOutlined,
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  BulbFilled,
  BulbOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Card, Carousel, Cascader, Checkbox, Col, DatePicker, FloatButton, Form, Image, Input, InputNumber, MenuProps, Modal, Radio, Rate, Row, Select, Switch, Tabs, Tooltip, TreeSelect, Upload } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import Link from 'next/link';
import Register from './Register';
import MySearch from './Search';
import FastOrder from './FastOrder';
import TextArea from 'antd/lib/input/TextArea';
import CommentModal from './CommentModal';
import { RcFile } from 'antd/es/upload';
import { MenuTheme } from 'antd/lib/menu';
import { ButtonType } from 'antd/es/button';


const { Header, Content, Footer, Sider } = Layout;

const AddProduct:React.FC= () => {
    

  let secondsToGo = 4;

  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [type, setType] = useState<ButtonType>('primary');

  const changeTheme = (value: boolean) => {
    
    localStorage.setItem("theme", theme);
    setTheme(value ? 'dark' : 'light');
    setType(value ? 'primary' : 'default');
  };

  const [file, setFile] = useState<RcFile | null>(null)

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

const [form] = Form.useForm();

const onFinish = async (values: any) => {
  const formData = new FormData();
  formData.append('file', file ? file : '');
  formData.append('product', JSON.stringify(values))

  await fetch(`${process.env.API_URL}/upload`, {
    method: "POST",
    body: formData
  });
  console.log('Success:', values);
  form.resetFields(); // сброс полей формы
};

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider         
      collapsible
      theme={'dark'} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={60}>
        <Menu defaultSelectedKeys={['1']} mode='vertical'
       theme={'dark'}
        > 
          <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Menu.Item>
          <Menu.Item key={2}><SearchOutlined />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Категории &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
          <Menu.Item key={3}><UserOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
        </Menu>    
       
      </Sider>

      <Layout className="site-layout">
      <div className="homepage_wrap">
      <div
             className='site-layout-background' 
          >
             <Menu className='menuItems' selectable={false} theme={theme} mode="horizontal">
          <div className='logo'>
          <Menu.Item>
              <Switch onChange={changeTheme} checked={theme === 'dark'} unCheckedChildren={<BulbFilled />} checkedChildren={<BulbOutlined/>}/>  Тема
          </Menu.Item>
          </div>
          <div className='loggedIn'>          
                </div>
            </Menu>
          </div>
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
        form={form}
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
         name="description"
         label="Описание продукта">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="picture" label="Фото" valuePropName="file">
         <Upload
  listType="picture-card"
  className="avatar-uploader"
  showUploadList={false}
  beforeUpload={(file) => {
    setFile(file);
    return false;
  }}
>
  {file ? (
    <img src={URL.createObjectURL(file)} alt="avatar" style={{ width: '100%' }} />
  ) : (
    uploadButton
  )}
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