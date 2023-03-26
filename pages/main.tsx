import {
    HomeOutlined,
    UserOutlined,
    InstagramOutlined,
    FacebookOutlined,
    SearchOutlined,
    LoadingOutlined,
    BulbOutlined,
    BulbFilled,
    PlusOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { Button, Carousel, Layout, Menu, MenuTheme, Switch, FloatButton, Row, Col, Image, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


import { useRouter } from 'next/router';
import { ButtonType } from 'antd/lib/button';
import Map from './map';
import { NotificationPlacement } from 'antd/es/notification/interface';

const { Header, Sider, Content } = Layout;

const Main = () => {
    const [api, contextHolder2] = notification.useNotification();
    const [collapsed, setCollapsed] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();

    const router = useRouter();


    const [theme, setTheme] = useState<MenuTheme>('dark');
    const [type, setType] = useState<ButtonType>('primary');

    const changeTheme = (value: boolean) => {

        localStorage.setItem("theme", theme);
        setTheme(value ? 'dark' : 'light');
        setType(value ? 'primary' : 'default');
    };

    const exit = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Выход',
                duration: 1,
            })
            .then(() => message.success('Вы вышли из аккаунта', 3))
    };

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
          message: `Внимание`,
          description:
            'Сначала войдите в аккаунт',
          placement,
        });
      };

    const onFinish = async (values: any) => {
        const response = await fetch(`https://blooming-journey-76324.herokuapp.com/auth/user`, {
            method: "GET",
            body: JSON.stringify(values),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }})
    }

    const logOut = () => {
        exit()
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("nextauth.message")
        setTimeout(() => {
            router.reload()
        }, 2500)
    }

    const { Header, Content, Footer, Sider } = Layout;

    const [item, setItem] = useState();

    useEffect (() => {

        setItem(localStorage.token)

    }, []);;

    return (
        <>
            {contextHolder}
            {contextHolder2}
            {/* {onFinish} */}
            <Layout className="layout" style={{ minHeight: '100vh' }}>
               <Sider
                    theme={theme} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} breakpoint={'lg'} collapsedWidth={60}>
                    <Menu defaultSelectedKeys={['1']} mode='vertical'
                          theme={theme}
                    >
                        <Menu.Item key={1}><Link href={'/'}><HomeOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Главная &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Menu.Item>
                        <Menu.Item key={3} onClick={() => openNotification('topRight')}><UserOutlined/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Профиль &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Menu.Item>
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
                                <div className='login'>
                                    <Menu.Item>
                                        <Link href={'/login'}>
                                            <Button type={type} icon={<LoginOutlined/>}>
                                                Вход
                                            </Button>
                                        </Link>
                                    </Menu.Item>

                                    <Menu.Item>
                                        <Link href={'/login'}>
                                            <Button type={type} icon={<PlusOutlined/>} style={{marginLeft: -20}}>
                                                Регистрация
                                            </Button>
                                        </Link>
                                    </Menu.Item>
                                </div>

                            </Menu>
                        </div>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                            }}
                        >
                            <div className='wrap_home'>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 52 }} justify='space-around'>
                                    <Col span={24}>
                                        <div className='img_carousel'>
                                            <Carousel autoplay effect='fade'>
                                                <div>
                                                    <Image preview={false} src='3.webp'/>
                                                </div>
                                                <div>
                                                    <Image preview={false} src='2.webp' />
                                                </div>
                                            </Carousel>
                                        </div>
                                    </Col>
                                    <div className='loader'>
                                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                                    </div>
                                    <Map />

                                    <FloatButton.BackTop />
                                </Row>

                            </div>
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
        </>
    )
}

export default Main;

