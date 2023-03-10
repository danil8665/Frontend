import React, { useEffect, useState } from 'react';
import {
  VideoCameraOutlined,
  HomeOutlined,
  UserOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
  BulbFilled,
  BulbOutlined,
  LoginOutlined,
  PlusOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Card, Carousel, Col, FloatButton, Form, Image, MenuProps, MenuTheme, message, Modal, QRCode, Radio, Rate, Row, Switch, Tabs, Tooltip } from 'antd';
import { Breadcrumb, Layout, Menu, Popover } from 'antd';
import Link from 'next/link';
import Register from '../Register';
import Search from '../Search';
import FastOrder from '../FastOrder';
import TextArea from 'antd/lib/input/TextArea';
import CommentModal from '../CommentModal';
import { Typography } from 'antd';
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ButtonType } from 'antd/lib/button';

const { Header, Content, Footer, Sider } = Layout;

const { Title, Text } = Typography;

    interface Props {
      id: any;
    }

const About:React.FC<Props> = ({id}) => {

  const countDown = () => {

    let secondsToGo = 5;
  
    const modal = Modal.success({
      title: 'Спасибо что оставили отзыв!',
      content: `Это окно закроется через ${secondsToGo} секунд.`,
    });
  
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `Это окно закроется через ${secondsToGo} секунд.`,
      });
    }, 1000);
  
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

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

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const router = useRouter()
console.log(router, 'ROUTER')

const [collapsed, setCollapsed] = useState(false);

const [instance, setInstance] = useState<any>('')
useEffect(() => {
   if (Object.keys(router.query).length > 0) {
    fetch(`http://127.0.0.1:80/product/${router.query.id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setInstance(data);
    })
   }
    }, [router.query]);

    const [image, setImage] = useState("");
    useEffect(() => {
      fetch('http://127.0.0.1:80/products')
          .then((response) => {
              return response.text();
          })
          .then((data) => {
              setImage(data);
          });
          
  }, []);

    const [theme, setTheme] = useState<MenuTheme>('dark');
    const [type, setType] = useState<ButtonType>('primary');
  
    const changeTheme = (value: boolean) => {
      setTheme(value ? 'dark' : 'light');
      setType(value ? 'primary' : 'default');
    };

    const [messageApi, contextHolder] = message.useMessage();

    const exit = () => {
      messageApi
        .open({
          type: 'loading',
          content: 'Выход',
          duration: 1,
        })
        .then(() => message.success('Вы вышли из аккаунта', 3))
    };

    const logOut = () => {
      exit()
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("nextauth.message")
      setTimeout(() => {
        router.push('/');
      }, 2500)
    }


    if (typeof window !== 'undefined') {
      const item = localStorage.getItem('token')

      if (item)
      return (
        <>        
        <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Sider         
collapsible
theme={theme} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={60}>
 <Menu mode='vertical'
 theme={theme}
 > 
   <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Menu.Item>
   <Menu.Item key={2}><SearchOutlined />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Категории &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
   <Menu.Item key={3}><UserOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
 </Menu>    

</Sider>

     <Layout className="site-layout">
     <div className="homepage_wrap">
     {/* <div
             className='site-layout-background' 
          > */}
             <Menu className='menuItems' selectable={false} theme={theme} mode="horizontal">
          <div className='logo'>
          <Menu.Item>
              <Switch onChange={changeTheme} checked={theme === 'dark'} unCheckedChildren={<BulbFilled />} checkedChildren={<BulbOutlined/>}/>  Тема
          </Menu.Item>
          </div>
          <div className='loggedIn'>
              <Menu.Item>
                  {`${localStorage.getItem('username')}`}&nbsp;&nbsp;&nbsp;

                  <Button style={{marginRight:10}} type={type} onClick={logOut} icon={<LogoutOutlined/>}>Выйти</Button>
              </Menu.Item>           
                </div>
            </Menu>
          </div>
       <Content style={{ margin: '0 16px'}}>
         <Breadcrumb style={{ margin: '16px 0' }}>
           <Breadcrumb.Item>{`${instance?.manufacturer}`}</Breadcrumb.Item>
           <Breadcrumb.Item>{`${instance?.name}`}</Breadcrumb.Item>
         </Breadcrumb>

<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='space-around'>

       <Image
       preview={{ visible: false }}
       width={650}
       src={`${instance.picture}`}
       onClick={() => setVisible(true)}
     />

     <div style={{ display: 'none' }}>
      
       <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
         <Image src={`${instance.picture}`} />
         <Image src={'2.jpg'} />
         <Image src={`3.jpg`} />
       </Image.PreviewGroup>
       </div>



             <div className="about_description">
           <Card bordered={false}>

<h1>Размер</h1>

<Radio.Group name='size' defaultValue="a" buttonStyle="solid" style={{ marginTop: 16 }}>
 <Radio.Button value="a">36</Radio.Button>
  <Radio.Button value="b" disabled>
   37
 </Radio.Button>
 <Radio.Button value="c">38</Radio.Button>
 <Radio.Button value="d">39</Radio.Button>
 <Radio.Button value="e">40</Radio.Button>
 <Radio.Button value="f">41</Radio.Button>
</Radio.Group>
<br/>
<br/>
<Title level={3}>Цена</Title>
<div className='price_discount'>
<p className='price'>{`${instance.price}`}</p>
<p className='discount'>{`${instance.discount}`}</p>
</div>
<h1>Оценить(по желанию)</h1>
 <Rate defaultValue={0}/>
<Form>
 <Form.Item>
 <Title level={4}>Описание:</Title>
 <div className='modelDescription'>{`${instance.name}`}</div>
 </Form.Item>
</Form>
<Form
name='basic'
onFinish={onFinish}
onFinishFailed={onFinishFailed}
initialValues={{ remember: true }}
autoComplete="off"
>
<Form.Item
 name="comment"
 rules={[{ required: true, message: 'Напишите что-то' }]}
>
</Form.Item>
<FastOrder />
</Form>
<div className='comments'>
<h1>Напишите отзыв:</h1>
<Form
name='basic'
onFinish={onFinish}
onFinishFailed={onFinishFailed}
initialValues={{ remember: true }}
autoComplete="off"
>
<Form.Item
 name="comment"
 rules={[{ required: true, message: 'Напишите что-то' }]}
>
 <TextArea            
   rows={6}
 >
 </TextArea>
</Form.Item>
<Form.Item
   shouldUpdate
   >
   {({ getFieldsValue }) => {
   const { comment } = getFieldsValue();
   const formIsComplete = !!comment;
 return (
   <div className='commentButton'>
 <Button
   onClick={countDown} 
   type="primary"
   htmlType="submit"
   className="loginFormButton"
   disabled={!formIsComplete}
 >
   Отправить
 </Button>
   </div>
 );
}}
</Form.Item>
</Form>
</div>
</Card>
</div>
</Row>

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
       {/* </div> */}
     </Layout>
   </Layout>
   </>
)}

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
         <Sider         
 theme={theme} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={60}>
  <Menu defaultSelectedKeys={['1']} mode='vertical'
  theme={theme}
  > 

    <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Menu.Item>
    <Menu.Item key={2}><SearchOutlined />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Категории &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
    <Menu.Item key={3}><UserOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
  </Menu>    
 
</Sider>

      <Layout className="site-layout">
      <div className="homepage_wrap">

      <Menu className='menuItems' selectable={false} theme={theme} mode="horizontal">
          <div className='logo'>
          <Menu.Item>
              <Switch onChange={changeTheme} checked={theme === 'dark'} unCheckedChildren={<BulbFilled />} checkedChildren={<BulbOutlined/>}/>  Тема
          </Menu.Item>
          </div>
             <div className='login'>
              <Menu.Item>
                 <Link href={'/logim'}>
                  <Button type={type} icon={<LoginOutlined/>}>
                    Вход
                  </Button>
                 </Link>
              </Menu.Item>     

                <Menu.Item>
                 <Link href={'/logim'}>
                  <Button type={type} icon={<PlusOutlined/>} style={{marginLeft: -20}}>
                    Регистрация
                  </Button>
                 </Link>
              </Menu.Item>       
                </div>

            </Menu>

        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{`${instance?.manufacturer}`}</Breadcrumb.Item>
            <Breadcrumb.Item>{`${instance?.name}`}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" 
              style={{
                margin: 5,
                padding: 2,
              }}>     
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='space-around'>
        <Image
        preview={{ visible: false }}
        width={650}
        src={`${instance.picture}`}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          <Image src={`${instance.picture}`} />
          <Image src="2.jpg" />
          <Image src="3.jpg" />
        </Image.PreviewGroup>
        </div>


              <div className="about_description">
            <Card bordered={false}>

<h1>Размер</h1>

<Radio.Group name='size' defaultValue="a" buttonStyle="solid" style={{ marginTop: 16 }}>
  <Radio.Button value="a">36</Radio.Button>
   <Radio.Button value="b" disabled>
    37
  </Radio.Button>
  <Radio.Button value="c">38</Radio.Button>
  <Radio.Button value="d">39</Radio.Button>
  <Radio.Button value="e">40</Radio.Button>
  <Radio.Button value="f">41</Radio.Button>
</Radio.Group>
<br/>
<br/>
<Title level={3}>Цена</Title>
<div className='price_discount'>
<p className='price'>{`${instance.price}`}</p>
<p className='discount'>{`${instance.discount}`}</p>
</div>
<h1>Оценить(по желанию)</h1>
  <Rate defaultValue={4}/>
<Form>
  <Form.Item>
  <Title level={4}>Описание:</Title>
  <div className='modelDescription'>{`${instance.name}`}</div>
  </Form.Item>
</Form>
<Form
name='basic'
onFinish={onFinish}
onFinishFailed={onFinishFailed}
initialValues={{ remember: true }}
autoComplete="off"
>
<Form.Item
  name="comment"
  rules={[{ required: true, message: 'Напишите что-то' }]}
>
</Form.Item>
<FastOrder />
</Form>
<div className='comments'>
<h1>Напишите отзыв:</h1>
<Form
name='basic'
onFinish={onFinish}
onFinishFailed={onFinishFailed}
initialValues={{ remember: true }}
autoComplete="off"
>
<Form.Item
  name="comment"
  rules={[{ required: true, message: 'Напишите что-то' }]}
>
  <TextArea            
    rows={6}
  >
  </TextArea>
</Form.Item>
<Form.Item
    shouldUpdate
    >
    {({ getFieldsValue }) => {
    const { comment } = getFieldsValue();
    const formIsComplete = !!comment;
  return (
    <div className='commentButton'>
  <Button
    onClick={countDown} 
    type="primary"
    htmlType="submit"
    className="loginFormButton"
    disabled={!formIsComplete}
  >
    Отправить
  </Button>
    </div>
  );
}}
</Form.Item>
</Form>
</div>
</Card>
</div>
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
export default About;