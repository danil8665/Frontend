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
import Register from './Register';
import MySearch from './Search';
import FastOrder from './FastOrder';
import TextArea from 'antd/lib/input/TextArea';
import CommentModal from './CommentModal';
import { RcFile } from 'antd/es/upload';


const { Header, Content, Footer, Sider } = Layout;

const AddProduct:React.FC= () => {
    

  let secondsToGo = 4;

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



const onFinish = async (values: any) => {
  const formData = new FormData();
  formData.append('file', file ? file : '');
  formData.append('product', JSON.stringify(values))

  await fetch('http://127.0.0.1:80/upload', {
    method: "POST",
    body: formData
  });
  console.log('Success:', values);
};

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={0}>
      <div className="logo">

        </div>
        <Menu theme="dark"> 
          <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ??????????????</Link></Menu.Item>
          <Menu.Item key={2}><SearchOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ??????????????????</Menu.Item>
          <Menu.Item key={3}><UserOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ??????????????</Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
      <div className="homepage_wrap">
        <Header className="site-layout-background" style={{ padding: 0 }} >
        <div className="header">
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
        <Form.Item label="???????????????????? ????????????????">
        </Form.Item>
        <Form.Item 
         name="manufacturer"
         label="??????????????????????????">
          <Input />
        </Form.Item>
        <Form.Item 
         name="name"
         label="????????????????">
          <Input />
        </Form.Item>
        <Form.Item 
         name="price"
         label="????????">
          <InputNumber />
        </Form.Item>
        <Form.Item 
         name="discount"
         label="????????????">
          <InputNumber />
        </Form.Item>
        <Form.Item 
         name="description"
         label="???????????????? ????????????????">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="picture" label="????????" valuePropName="file">
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
                    ????????????????
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
        Dixi Shoes ??2022 
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